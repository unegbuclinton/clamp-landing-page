import mongoose, { Schema, Document } from 'mongoose'
import { ICondition, ConditionSchema } from './Rule'

export interface ICampaignDraft {
  id?: string
  name: string
  startDate: Date
  endDate: Date
  ruleIds: string[]
  status: 'draft' | 'active' | 'inactive'
  redemptionRules: IRedemptionConfig[]
  adminEvents: {
    eventName: string
    payload: Record<string, any>
    userId: string
    createdAt: Date
  }[]
  leaderBoardIds?: string[]
}

export interface ICampaign extends ICampaignDraft, Document {
  id: string
  createdAt: Date
  updatedAt: Date
}
export interface IRedemptionConfig {
  assetConditions: ICondition[]
  userConditions: ICondition[]
  liquidationInstrument: string
  redeemableFrom: Date
  redeemableUntil: Date
}

const RedemptionConfigSchema = new Schema<IRedemptionConfig>(
  {
    assetConditions: {
      type: [ConditionSchema],
      required: true,
    },
    userConditions: {
      type: [ConditionSchema],
      required: true,
    },
    liquidationInstrument: { type: String, required: true },
    redeemableFrom: { type: Date, required: true },
    redeemableUntil: { type: Date, required: true },
  },
  {
    _id: false,
  }
)

const CampaignSchema = new Schema<ICampaign>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    ruleIds: { type: [String], required: true },
    status: { type: String, enum: ['draft', 'active', 'inactive'], required: true },
    redemptionRules: [RedemptionConfigSchema],
    adminEvents: { eventName: String, userId: String, createdAt: Date, payload: Object },
    leaderBoardIds: { type: [String], required: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

CampaignSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret._id
    return ret
  },
})

export const Campaign = mongoose.model<ICampaign>('Campaign', CampaignSchema)
