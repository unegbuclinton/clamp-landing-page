import { ILeaderboard, ILeaderboardService, ILeaderboardEntry } from '../interfaces/ILeaderboard'
import { Leaderboard } from '../models/Leaderboard'
import { ScoreService } from './score'

export class LeaderboardService implements ILeaderboardService {
  private scoreService: ScoreService
  constructor() {
    this.scoreService = new ScoreService()
  }

  async getTopParticipants(topN: number): Promise<ILeaderboardEntry[]> {
    // This is a simplistic implementation. In a real-world scenario, we'd have to aggregate scores and rank users.
    return []
  }

  async getParticipantRank(userId: string, roundId: string): Promise<number> {
    // Again, this is a simplistic mock. In a real-world scenario, we'd query the leaderboard and find the rank.
    return 1
  }

  async updateRankings(roundId: string): Promise<boolean> {
    const scores = await this.scoreService.getRoundScores(roundId)
    const leaderboard = await Leaderboard.findOne({ roundId })
    if (!leaderboard) {
      const newLeaderboard = new Leaderboard({ roundId, entries: [] })
      await newLeaderboard.save()
    }

    return true
  }
}
