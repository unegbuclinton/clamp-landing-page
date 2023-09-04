import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { Trigger, ITrigger } from '../models/Trigger'
import { Campaign, ICampaign } from '../models/Campaign'
import { CustomerAccount, ICustomerAsset } from '../models/CustomerAccount'
import { Rule, IRule } from '../models/Rule'
import { checkCondition } from '../../../lib/conditions'
import { GameService } from '@/v1/gamificationAPI/services/game'

const gameService = new GameService()

const getAllTriggers = async (): Promise<ITrigger[]> => {
  return Trigger.find().exec()
}

const getTriggerById = async (id: string): Promise<ITrigger | null> => {
  return Trigger.findById(id).exec()
}

const createTrigger = async (
  triggerData: Partial<ITrigger>
): Promise<{ trigger: ITrigger; rewards: ICustomerAsset[] }> => {
  triggerData.id = uuidv4()
  const newTrigger = new Trigger({ ...triggerData, status: 'pending' })
  let createdTrigger: ITrigger = await newTrigger.save()
  console.log('trigger created, saved with id: ', createdTrigger.id)
  const session = await mongoose.startSession()
  console.log('transaction session started')
  session.startTransaction()
  const awardedAssets: ICustomerAsset[] = []
  try {
    const customerAccount = await CustomerAccount.findOne({
      id: triggerData.customerId,
    }).session(session)
    if (customerAccount) {
      console.log('customer account found')
      console.log('customer enrolled in campaigns with ids: ', customerAccount.campaignIds)
      const enrolledCampaigns: ICampaign[] = await Campaign.find({
        id: { $in: customerAccount.campaignIds },
        status: 'active',
        endDate: { $gte: new Date() },
      }).session(session)
      console.log('enrolled campaigns found: ', enrolledCampaigns.length)

      for (const campaign of enrolledCampaigns) {
        const associatedRules: IRule[] = await Rule.find({
          id: { $in: campaign.ruleIds },
        }).session(session)
        console.log('associated rules found: ', associatedRules.length)

        for (const rule of associatedRules) {
          const { conditions, assetId, assetQty, eventName, multiplier } = rule
          console.log('checking rule: ', rule.id)
          console.log('rule conditions: ', conditions)
          if (eventName !== triggerData.eventName) continue
          const doesMeetConditions = conditions.every((condition) =>
            checkCondition(condition, triggerData.payload)
          )
          if (!doesMeetConditions) {
            console.log('rule conditions not met')
            continue
          }
          console.log('rule conditions met, adding asset to customer account')
          const earnedAsset: ICustomerAsset = {
            assetId,
            qty: assetQty,
            expiryDate: new Date(Date.now() + 5 * 365 * 24 * 60 * 60 * 1000),
          }
          console.log('checking for multiplier')
          if (multiplier) {
            console.log('multiplier found')
            if (triggerData.payload[multiplier.key]) {
              earnedAsset.qty =
                earnedAsset.qty *
                (multiplier.multiple * Number(triggerData.payload[multiplier.key]))
            }
            console.log('multiplier applied')
          }
          awardedAssets.push(earnedAsset)
        }

        const { gameId } = campaign
        if (gameId) {
          const game = await gameService.getGameById(gameId)
          const lbId  = game.currentLeaderboardId
          
        }
      }

      customerAccount.assets = [...customerAccount.assets, ...awardedAssets]

      await customerAccount.save({ session })
      createdTrigger = await Trigger.findOneAndUpdate(
        { id: createdTrigger.id },
        { status: 'processed' },
        { session, new: true }
      )
      console.log('customer account updated')
    } else {
      console.log('customer account not found')
    }
    console.log('transaction session committing...')
    await session.commitTransaction()
    session.endSession()
    console.log('transaction session ended')
    return { trigger: createdTrigger, rewards: awardedAssets }
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    console.error(error)
    throw error
  }
}

const updateTrigger = async (
  id: string,
  triggerData: Partial<ITrigger>
): Promise<ITrigger | null> => {
  return Trigger.findByIdAndUpdate(id, triggerData, { new: true }).exec()
}

export const TriggerService = {
  getAllTriggers,
  getTriggerById,
  createTrigger,
  updateTrigger,
}
