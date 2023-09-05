import mongoose, { Schema } from 'mongoose'

export interface ITriggerDraft {
  id?: string
  customerId: string
  eventName: string
  payload: Record<string, any>
}
export interface ITrigger extends ITriggerDraft {
  id: string
  status: 'processed' | 'pending'
  createdAt: Date
  updatedAt: Date
}

const TriggerSchema = new Schema<ITrigger>(
  {
    id: { type: String, required: true, unique: true },
    customerId: { type: String, required: true },
    eventName: { type: String, required: true },
    payload: { type: Schema.Types.Mixed, required: true },
    status: { type: String, enum: ['processed', 'pending'], required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

TriggerSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret._id
    return ret
  },
})

export const Trigger = mongoose.model<ITrigger>('Trigger', TriggerSchema)
