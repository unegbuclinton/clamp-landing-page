import { IDraftGame, IGame, IGameService } from '../interfaces/IGame'
import { RoundService } from './round'
import { IRound } from '../interfaces/IRound'
import { Game } from '../models/Game'
import { v4 as uuidv4 } from 'uuid'

export class GameService implements IGameService {
  private roundService: RoundService
  constructor() {
    this.roundService = new RoundService()
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
}
