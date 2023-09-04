import { GameStatus } from './IGame'
export interface IRoundService {
  start(gameId: string): Promise<IRound>
  end(id: string): Promise<boolean>
  fetchGameRounds(gameId: string): Promise<IRound[]>
  getRoundById(id: string): Promise<IRound | null>
  getRoundByIndex(gameId: string, index: number): Promise<IRound | null>
}

export interface IRound {
  id: string
  status: GameStatus
  gameId: string
  campaignId: string
  index: number
  startedAt: Date
  endedAt?: Date
}
