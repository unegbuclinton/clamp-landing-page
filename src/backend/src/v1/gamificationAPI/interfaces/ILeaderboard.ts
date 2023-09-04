export interface ILeaderboardService {
  getTopParticipants(topN: number, roundId: string): Promise<ILeaderboardEntry[]>
  getParticipantRank(userId: string, roundId: string): Promise<number>
  updateRankings(roundId: string): Promise<boolean>
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
  stats: { prevRoundScore: number; percentChange: number; absoluteChange: number }
}
