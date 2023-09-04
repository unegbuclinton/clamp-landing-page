import { IGame } from "./IGame"

export interface ILeaderboardService {
  getTopParticipants(topN: number, roundId: string): Promise<ILeaderboardEntry[]>
  getParticipantRank(userId: string, roundId: string): Promise<number>
  updateRankings(game: IGame, statKey: LbStatKey): Promise<boolean>
}

export interface ILeaderboard {
  id: string
  roundId: string
  entries: ILeaderboardEntry[]
}

export interface ILeaderboardEntry {
  userId: string
  rank: number
  isWinning: boolean
  score: number
  prevRoundScore: number
  stats: { percentChange: number; absoluteChange: number }
}

export type LbStatKey = keyof ILeaderboardEntry['stats']
