import { Campaign, ICampaign, ICampaignDraft } from '../models/Campaign'
import { MessagingService } from './messaging'
import { CustomerAccount } from '../models/CustomerAccount'
import { v4 as uuidv4 } from 'uuid'

const messagingService = new MessagingService()

const getAllCampaigns = async (): Promise<ICampaign[]> => {
  return Campaign.find().exec()
}

const getCampaignById = async (id: string): Promise<ICampaign | null> => {
  return Campaign.findOne({ id }).exec()
}

const createCampaign = async (campaignData: ICampaignDraft): Promise<ICampaign> => {
  campaignData.id = uuidv4()
  const newCampaign = new Campaign(campaignData)
  return await newCampaign.save()
}

const updateCampaign = async (
  id: string,
  campaignData: Partial<ICampaign>
): Promise<ICampaign | null> => {
  const updatedCampaign = await Campaign.findOneAndUpdate(
    { id },
    { $set: campaignData },
    { new: true }
  ).exec()
  return updatedCampaign
}
const updateCampaignStatus = async (
  id: string,
  eventName: string,
  status: string
): Promise<ICampaign | null> => {
  const adminEvent = {
    eventName,
    payload: {},
    createdAt: new Date(),
    userId: 'admin', // get from auth middleware in future
  }
  let statusFilter
  if (eventName === 'start-campaign') {
    statusFilter = 'draft'
  } else if (eventName === 'pause-campaign' || eventName === 'stop-campaign') {
    statusFilter = 'active'
  } else if (eventName === 'resume-campaign') {
    statusFilter = 'inactive'
  }
  const updatedCampaign = await Campaign.findOneAndUpdate(
    { id, status: statusFilter },
    { $push: { adminEvents: adminEvent }, $set: { status } },
    { new: true }
  ).exec()

  return updatedCampaign
}

const pauseCampaign = (id: string): Promise<ICampaign | null> => {
  return updateCampaignStatus(id, 'pause-campaign', 'inactive')
}

const stopCampaign = async (id: string): Promise<ICampaign | null> => {
  return await updateCampaignStatus(id, 'stop-campaign', 'inactive')
}

const resumeCampaign = async (id: string): Promise<ICampaign | null> => {
  return await updateCampaignStatus(id, 'resume-campaign', 'active')
}

const startCampaign = async (id: string): Promise<ICampaign | null> => {
  return await updateCampaignStatus(id, 'start-campaign', 'active')
}

const enrollCustomer = async (campaignId: string, customerId: string): Promise<boolean> => {
  const campaign = await getCampaignById(campaignId)
  if (!campaign || campaign.endDate <= new Date()) return false
  const updatedCustomer = await CustomerAccount.findOneAndUpdate(
    { id: customerId },
    { $push: { campaignIds: campaignId } },
    { new: true }
  ).exec()
  if (!updatedCustomer) return false
  if (campaign.status === 'active') {
    await messagingService.sendMsg({
      to: customerId,
      body: `Welcome to ${campaign.name}!`,
      subject: campaign.name,
    })
  }
  return true
}

const enrollCustomersByImportId = async (
  importOperationId: string,
  campaignId: string
): Promise<number> => {
  const updatedCustomers = await CustomerAccount.updateMany(
    { 'customerData.metadata.importOperationId': importOperationId },
    { $push: { campaignIds: campaignId } },
    { new: true }
  ).exec()
  return updatedCustomers.modifiedCount
}
export const CampaignService = {
  getAllCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  pauseCampaign,
  stopCampaign,
  resumeCampaign,
  startCampaign,
  enrollCustomer,
  enrollCustomersByImportId,
}
