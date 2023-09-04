import { IDraftGame, IGame, IGameService } from '../interfaces/IGame'
import { ILeaderboardEntry } from '../interfaces/ILeaderboard'
import { RoundService } from './round'
import { LeaderboardService } from './leaderboard'
import { ScoreService } from './score'
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
  private scoreService: ScoreService
  constructor() {
    this.roundService = new RoundService()
    this.leaderboardService = new LeaderboardService()
    this.scoreService = new ScoreService()
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
    const game = await this.getGameById(gameId)
    if (!game) throw new Error('GameNotFound')
    if (game.status !== 'started') throw new Error('GameNotStarted')
    const currentRound = await this.fetchCurrentRound(gameId)
    if (!currentRound) throw new Error('RoundNotFound')
    const scoreVal = payload['trxn_amt']
    await this.scoreService.addScore(playerId, Number(scoreVal), currentRound.id)
    const roundScores = await this.scoreService.getRoundScores(currentRound.id)
    const playerScores: Record<string, number> = {}
    for (const score of roundScores) {
      if (!playerScores[score.userId]) {
        playerScores[score.userId] = 0
      }
      playerScores[score.userId] += score.points
    }
    const prevLbByUserId: Record<string, ILeaderboardEntry> = {}
    if (currentRound.index > 0) {
      const prevRound = await this.roundService.getRoundByIndex(gameId, currentRound.index - 1)
      const prevRoundLeaderboard = await this.leaderboardService.getLeaderboard(prevRound.id)
      for (const entry of prevRoundLeaderboard.entries) {
        prevLbByUserId[entry.userId] = entry
      }
    }
    const lbEntries = Object.entries(playerScores).map(([userId, score], index) => {
      const prevRoundEntry = prevLbByUserId[userId]
      const prevRoundScore = prevRoundEntry ? prevRoundEntry.score : 0
      const absoluteChange = score - prevRoundScore
      const percentChange = (absoluteChange / prevRoundScore) * 100

      const entry: ILeaderboardEntry = {
        userId,
        rank: index + 1,
        score,
        isWinning: index < game.numOfWinners,
        stats: { prevRoundScore, percentChange, absoluteChange },
      }
      return entry
    })
    let sortedLbEntries = lbEntries
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
        sortedLbEntries = sortedLbEntries.sort((a, b) => {
          return b.stats.absoluteChange - a.stats.absoluteChange
        })

        break
      case 'h_growth_trxn_amt_p':
        sortedLbEntries = sortedLbEntries.sort((a, b) => {
          return b.stats.percentChange - a.stats.percentChange
        })
        break
      case 'l_cancel_rate':
        break
      default:
        break
    }
    sortedLbEntries = sortedLbEntries.map((entry, index) => {
      entry.rank = index + 1
      return entry
    })
  }
}
