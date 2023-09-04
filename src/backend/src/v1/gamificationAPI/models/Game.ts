import mongoose from 'mongoose'
import { IGame } from '../interfaces/IGame'

const GameSchema = new mongoose.Schema<IGame>(
  {
    id: { type: String, required: true, unique: true },
    status: { type: String, required: true },
    currentRoundId: { type: String, required: true },
    currentRoundIndex: { type: Number, required: true },
    currentLeaderboardId: { type: String, required: true },
    nextRoundStartsAt: { type: Date, required: true },
    campaignId: { type: String, required: true },
    roundsDuration: { type: Number, required: true },
    numOfRounds: { type: Number, required: true },
    numOfWinners: { type: Number, required: true },
    winningCriteriaCode: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

GameSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret._id
    return ret
  },
})

export const Game = mongoose.model<IGame>('Games', GameSchema)
