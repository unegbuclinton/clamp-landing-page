import mongoose from 'mongoose'
import { IRound } from '../interfaces/IRound'

const RoundSchema = new mongoose.Schema<IRound>(
  {
    id: { type: String, required: true, unique: true },
    status: { type: String, required: true },
    gameId: { type: String, required: true },
    campaignId: { type: String, required: true },
    index: { type: Number, required: true },
    startedAt: { type: Date, required: true },
    endedAt: { type: Date, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

RoundSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret._id
    return ret
  },
})

export const Round = mongoose.model<IRound>('Rounds', RoundSchema)
