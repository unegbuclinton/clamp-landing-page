import { IRound, IRoundService } from '../interfaces/IRound'
import { Round } from '../models/Round'
import { GameStatus } from '../interfaces/IGame'
import { GameService } from './game'

const gameService = new GameService()

export class RoundService implements IRoundService {
  async start(gameId: string): Promise<IRound> {
    const game = await gameService.getGameById(gameId)
    const lastGameRound = await Round.findOne({
      gameId,
    }).sort({ index: -1 })
    let newRoundIndex = 0
    if (lastGameRound) {
      newRoundIndex = lastGameRound.index + 1
    }
    const newRound: IRound = {
      id: `${gameId}--${newRoundIndex}`,
      winnerIds: [],
      status: 'started' as GameStatus,
      gameId,
      campaignId: game.campaignId,
      index: newRoundIndex,
      startedAt: new Date(),
      endedAt: new Date(), // Placeholder, will be updated when round ends
    }
    const startedRound = new Round(newRound)
    return await startedRound.save()
  }

  async end(id: string): Promise<boolean> {
    const currentRound = await Round.findOne({
      id
    })
    if (!currentRound) {
      throw new Error('Round not found')
    }

    currentRound.status = 'stopped'
    currentRound.endedAt = new Date()
    await currentRound.save()
    return true
  }

  async calculateWinners(): Promise<string[]> {
    return []
  }

  async fetchGameRounds(gameId: string): Promise<IRound[]> {
    return await Round.find({ gameId }).sort({ startedAt: -1 })
  }

  async getRoundById(id: string): Promise<IRound | null> {
    return await Round.findOne({ id })
  }
}

export default new RoundService()
