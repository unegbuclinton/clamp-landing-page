import { IRound } from './IRound'
export type GameStatus = 'pending' | 'started' | 'paused' | 'stopped'

export interface IDraftGame {
  campaignId: string
  roundsDuration: number // in ms
  numOfRounds: number
  numOfWinners: number
}

export interface IGame extends IDraftGame {
  id: string
  status: GameStatus
  currentRoundId: string
  currentRoundIndex: number
  currentLeaderboardId: string
  nextRoundStartsAt: Date
  createdAt: Date
  updatedAt: Date
}

export interface IGameService {
  fetchCurrentRound(gameId: string): Promise<IRound | null>
  endRound(gameId: string): Promise<boolean>
  nextRound(gameId: string): Promise<IRound>
  initNewGame(draftGame: IDraftGame): Promise<IGame>
  startGame(campaignId: string): Promise<IGame>
  endGame(id: string): Promise<boolean>
  getAllGames(): Promise<IGame[]>
  getGameById(id: string): Promise<IGame | null>
}
