export interface ILeaderboardService {
  getTopParticipants(topN: number): Promise<ILeaderboardEntry[]>
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
  score: number
  prevRoundScore: number
  percentChange: number
  absoluteChange: number
}
