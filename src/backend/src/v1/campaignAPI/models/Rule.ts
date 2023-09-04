import mongoose, { Schema } from 'mongoose'

export interface ICondition {
  key: string
  operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin'
  value: string
}

export interface IMultiplier {
  key: string
  multiple: number
}

export interface IRuleDraft {
  id?: string
  assetId: string
  assetQty: number
  eventName: string
  conditions: ICondition[]
  multiplier?: IMultiplier
  note?: string
  scoreKey?: string
}

export interface IRule extends IRuleDraft {
  id: string
  createdAt: Date
  updatedAt: Date
}

export const ConditionSchema = new Schema<ICondition>(
  {
    key: { type: String, required: true },
    operator: { type: String, required: true },
    value: { type: String, required: true },
  },
  { versionKey: false, _id: false }
)

export const MultiplierSchema = new Schema<IMultiplier>(
  {
    key: { type: String, required: true },
    multiple: { type: Number, required: true },
  },
  { versionKey: false, _id: false }
)

const RuleSchema = new Schema<IRule>(
  {
    id: { type: String, required: true, unique: true },
    assetId: { type: String, required: true },
    assetQty: { type: Number, required: true },
    eventName: { type: String, required: true },
    conditions: { type: [ConditionSchema], required: true },
    multiplier: { type: MultiplierSchema, required: false },
    note: { type: String, required: false },
    scoreKey: { type: String, required: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

RuleSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret._id
    return ret
  },
})
export const Rule = mongoose.model<IRule>('Rule', RuleSchema)
