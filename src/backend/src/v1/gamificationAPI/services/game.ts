import { IDraftGame, IGame, IGameService } from '../interfaces/IGame'
import { RoundService } from './round'
import { LeaderboardService } from './leaderboard'
import { IRound } from '../interfaces/IRound'
import { Game } from '../models/Game'
import { v4 as uuidv4 } from 'uuid'

export const winningCriteria: Record<string, string> = {
  h_spend: 'Highest spend',
  h_trxn_vol: 'Highest transaction volume',
  h_trxn_amt: 'Highest transaction amount',
  h_growth_trxn_vol: 'Highest transaction volume growth',
  h_growth_trxn_vol_p: 'Highest transaction volume growth %',
  h_growth_trxn_amt: 'Highest transaction amount growth',
  h_growth_trxn_amt_p: 'Highest transaction amount growth %',
  l_cancel_rate: 'Lowest cancellation rate',
}

export class GameService implements IGameService {
  private roundService: RoundService
  private leaderboardService: LeaderboardService
  constructor() {
    this.roundService = new RoundService()
    this.leaderboardService = new LeaderboardService()
  }

  async fetchCurrentRound(gameId: string): Promise<IRound | null> {
    const gameRounds = await this.roundService.fetchGameRounds(gameId)
    return gameRounds[0]
  }

  async nextRound(gameId: string): Promise<IRound> {
    const currentRound = await this.fetchCurrentRound(gameId)
    const game = await this.getGameById(gameId)
    if (!game) throw new Error('GameNotFound')
    if (Date.now() < game.nextRoundStartsAt.getTime()) {
      throw new Error('Cannot start new round before the current round ends')
    }
    if (currentRound) {
      await this.endRound(gameId)
    }
    const next = await this.roundService.start(gameId)
    return next
  }

  async endRound(gemeId: string): Promise<boolean> {
    const game = await this.getGameById(gemeId)
    if (!game) throw new Error('GameNotFound')
    const currentRound = await this.roundService.getRoundById(game.currentRoundId)
    if (currentRound) {
      await this.roundService.end(currentRound.id)
      return true
    }
    return false
  }

  async getGameById(id: string): Promise<IGame | null> {
    return await Game.findOne({ id })
  }

  async getAllGames(): Promise<IGame[]> {
    return await Game.find()
  }

  async endGame(id: string): Promise<boolean> {
    await this.endRound(id)
    await Game.findOneAndUpdate({ id }, { status: 'stopped' })
    return false
  }

  async startGame(id: string): Promise<IGame> {
    const game = await Game.findOne({ id })
    if (game) {
      game.status = 'started'
      const round = await this.roundService.start(game.id)
      game.currentRoundId = round.id
      game.nextRoundStartsAt = new Date(Date.now() + game.roundsDuration)
      await game.save()
      return game
    }
    throw new Error('Game not found')
  }

  async initNewGame(dGame: IDraftGame): Promise<IGame> {
    const game = new Game({
      id: uuidv4(),
      status: 'pending',
      currentRoundId: '',
      ...dGame,
    })
    await game.save()
    return game
  }

  async processPlayerAction({
    playerId,
    gameId,
    payload,
  }: {
    playerId: string
    gameId: string
    payload: Record<string, any>
  }) {
    // scenario 1: player action is a trigger because the
    const game = await this.getGameById(gameId)
    if (!game) throw new Error('GameNotFound')
    if (game.status !== 'started') throw new Error('GameNotStarted')
    const currentRound = await this.fetchCurrentRound(gameId)
    if (!currentRound) throw new Error('RoundNotFound')
    const { winningCriteriaCode } = game
    switch (winningCriteriaCode) {
      case 'h_spend':
        break
      case 'h_trxn_vol':
        break
      case 'h_trxn_amt':
        break
      case 'h_growth_trxn_vol':
        break
      case 'h_growth_trxn_vol_p':
        break
      case 'h_growth_trxn_amt':
        // here we want to check if the player has the highest growth in transaction amount compared to the previous round
        // to achieve this, we need to get the player's transaction amount in the previous round
        // and compare it to the current round
        
        const currentRound = await this.fetchCurrentRound(gameId)
        if (!currentRound) throw new Error('RoundNotFound')
        const currRoundIndex = currentRound.index
      const prevRound = await this.roundService.getRoundByIndex(gameId, currRoundIndex - 1)
      const prevRoundLeaderboard = this.leaderboardService.getLeaderboard(prevRound.id)
      const leaderBoard

        break
      case 'h_growth_trxn_amt_p':
        break
      case 'l_cancel_rate':
        break
      default:
        break

    }

    //
  }
}
