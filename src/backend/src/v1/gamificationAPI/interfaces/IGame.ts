import { IRound } from './IRound'
export type GameStatus = 'pending' | 'started' | 'paused' | 'stopped'

export interface IGame {
  id: string
  status: GameStatus
  currentRoundId: string
  nextRoundStartsAt: Date
  campaignId: string
  roundsDuration: number // in ms
  winnerQuota: number
  createdAt: Date
  updatedAt: Date
}

export interface IGameService {
  fetchCurrentRound(gameId: string): Promise<IRound | null>
  endRound(gameId: string): Promise<boolean>
  nextRound(gameId: string): Promise<IRound>
  initNewGame(campaignId: string, winnerQuota: number): Promise<IGame>
  startGame(campaignId: string): Promise<IGame>
  endGame(id: string): Promise<boolean>
  getAllGames(): Promise<IGame[]>
  getGameById(id: string): Promise<IGame | null>
}
