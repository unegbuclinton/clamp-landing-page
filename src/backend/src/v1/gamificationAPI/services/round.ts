import { IRound, IRoundService } from '../interfaces/IRound'
import { Round } from '../models/Round'
import { Game } from '../models/Game'
import { GameStatus } from '../interfaces/IGame'
import { TriggerService } from '../../campaignAPI/services/trigger'
import { LeaderboardService } from './leaderboard'

export class RoundService implements IRoundService {
  private triggerService: typeof TriggerService
  private leaderboardService: LeaderboardService

  constructor() {
    this.triggerService = TriggerService
    this.leaderboardService = new LeaderboardService()
  }
  async start(gameId: string): Promise<IRound> {
    const game = await Game.findOne({ id: gameId }).exec()
    if (!game) {
      throw new Error('Game not found')
    }
    const lastGameRound = await Round.findOne({
      gameId,
    }).sort({ index: -1 })
    let newRoundIndex = 0
    if (lastGameRound) {
      newRoundIndex = lastGameRound.index + 1
    }
    const newRound: IRound = {
      id: `${gameId}--${newRoundIndex}`,
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

  async end(id: string, numOfWinners = 1): Promise<boolean> {
    const currentRound = await Round.findOne({
      id,
    })
    if (!currentRound) {
      throw new Error('Round not found')
    }

    currentRound.status = 'stopped'
    currentRound.endedAt = new Date()
    await currentRound.save()
    const lbEntries = await this.leaderboardService.getTopParticipants(numOfWinners, id)
    const evtTriggerPms = lbEntries.map((entry) => {
      return this.triggerService.createTrigger({
        eventName: 'end_game_round',
        customerId: entry.userId,
        payload: {
          position: entry.rank,
          numOfWinners,
        },
      })
    })
    await Promise.all(evtTriggerPms)
    return true
  }

  async fetchGameRounds(gameId: string): Promise<IRound[]> {
    return await Round.find({ gameId }).sort({ startedAt: -1 })
  }

  async getRoundById(id: string): Promise<IRound | null> {
    return await Round.findOne({ id })
  }

  async getRoundByIndex(gameId: string, index: number): Promise<IRound | null> {
    return await Round.findOne({ gameId, index })
  }
}

export default new RoundService()
