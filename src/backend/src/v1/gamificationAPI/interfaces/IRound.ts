import { GameStatus } from './IGame'
export interface IRoundService {
  start(gameId: string): Promise<IRound>
  end(id: string): Promise<boolean>
  calculateWinners(): Promise<string[]>
  fetchGameRounds(gameId: string): Promise<IRound[]>
  getRoundById(id: string): Promise<IRound | null>
}

export interface IRound {
  id: string
  winnerIds: string[]
  status: GameStatus
  gameId: string
  campaignId: string
  index: number
  startedAt: Date
  endedAt?: Date
}
