import { IDraftGame, IGame, IGameService } from '../interfaces/IGame'
import { CampaignService } from '../../campaignAPI/services/campaign'
import { RoundService } from './round'
import { LeaderboardService } from './leaderboard'
import { ScoreService } from './score'
import { IRound } from '../interfaces/IRound'
import { Game } from '../models/Game'
import { winningEvalConfig } from '../../../lib/game'
import { v4 as uuidv4 } from 'uuid'

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
      await this.roundService.end(currentRound.id, game.numOfWinners)
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

  async initNewGame(dGame: IDraftGame): Promise<IGame|null> {
    const campaign = await CampaignService.getCampaignById(dGame.campaignId)
    if (!campaign) {
      console.log('Campaign not found')
      return null
    }
    const game = new Game({
      id: uuidv4(),
      status: 'pending',
      currentRoundId: '',
      currentRoundIndex: 0,
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
    const { winningCriteriaCode } = game
    const { scoreKey, statKey } = winningEvalConfig[winningCriteriaCode]
    const scoreVal = payload[scoreKey] || 0
    await this.scoreService.addScore(playerId, Number(scoreVal), game.currentRoundId)
    await this.leaderboardService.updateRankings(game, statKey)
  }

  async updateGameStatuses(): Promise<boolean> {
    const games = await this.getAllGames()
    console.log('updating game statuses')
    console.log('total games: ', games.length)
    for (const game of games) {
      console.log('processing game  with id: ', game.id)
      // @todo: check for campaign end date and all that other stuff
      if (game.status !== 'started') {
        console.log('game not started')
        continue
      }
      const tDelta = game.nextRoundStartsAt.getTime() - Date.now()
      if (tDelta <= 0 && game.currentRoundIndex < game.numOfRounds) {
        console.log('lost time: ', tDelta)
        await this.nextRound(game.id)
      }
      if (game.currentRoundIndex >= game.numOfRounds) {
        await this.endGame(game.id)
      }
    }
    return true
  }
}
