import mongoose from 'mongoose'
import { IScore } from '../interfaces/IScore'

const ScoreSchema = new mongoose.Schema<IScore>(
  {
    id: { type: String, required: true, unique: true },
    points: { type: Number, required: true },
    userId: { type: String, required: true },
    roundId: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

ScoreSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret._id
    return ret
  },
})

export const Score = mongoose.model<IScore>('Scores', ScoreSchema)
