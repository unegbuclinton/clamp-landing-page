import mongoose from 'mongoose'
import { ILeaderboard } from '../interfaces/ILeaderboard'

const LeaderboardEntrySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  rank: { type: Number, required: true },
  score: { type: Number, required: true },
  prevRoundScore: { type: Number, required: true },
  percentChange: { type: Number, required: true },
  absoluteChange: { type: Number, required: true },
})

const LeaderboardSchema = new mongoose.Schema<ILeaderboard>(
  {
    id: { type: String, required: true, unique: true },
    roundId: { type: String, required: true },
    entries: [LeaderboardEntrySchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

LeaderboardSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret._id
    return ret
  },
})

export const Leaderboard = mongoose.model<ILeaderboard>('Leaderboards', LeaderboardSchema)
