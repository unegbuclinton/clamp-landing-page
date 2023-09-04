import { ILeaderboard, ILeaderboardService, ILeaderboardEntry } from '../interfaces/ILeaderboard'
import { Leaderboard } from '../models/Leaderboard'
import { ScoreService } from './score'
import { RoundService } from './round'

export class LeaderboardService implements ILeaderboardService {
  private scoreService: ScoreService
  private roundService: RoundService
  constructor() {
    this.scoreService = new ScoreService()
    this.roundService = new RoundService()
  }

  async getTopParticipants(topN: number, roundId: string): Promise<ILeaderboardEntry[]> {
    const leaderboard = await this.getLeaderboard(roundId)
    return leaderboard.entries.slice(0, topN)
  }

  async getParticipantRank(userId: string, roundId: string): Promise<number> {
    // Again, this is a simplistic mock. In a real-world scenario, we'd query the leaderboard and find the rank.
    return 1
  }

  async updateRankings(roundId: string): Promise<boolean> {
    const scores = await this.scoreService.getRoundScores(roundId)
    let leaderboard = await Leaderboard.findOne({ roundId })
    if (!leaderboard) {
      leaderboard = new Leaderboard({ roundId, entries: [] })
      await leaderboard.save()
    }
    const entries = leaderboard.entries
    for (const score of scores) {
      const entry = entries.find((e) => e.userId === score.userId)
      if (entry) {
        entry.score += score.points
      } else {
        entries.push({
          userId: score.userId,
          rank: 0,
          score: score.points,
          stats: { prevRoundScore: 0, percentChange: 0, absoluteChange: 0 },
        })
      }
    }

    return true
  }

  async getLeaderboard(roundId: string): Promise<ILeaderboard> {
    const leaderboard = await Leaderboard.findOne({ roundId })
    if (!leaderboard) {
      throw new Error('Leaderboard not found')
    }
    return leaderboard
  }
}
