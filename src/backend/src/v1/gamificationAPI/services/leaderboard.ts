import { ILeaderboardService, ILeaderboardEntry } from '../interfaces/ILeaderboard'

export class LeaderboardService implements ILeaderboardService {
  private participants: ILeaderboardEntry[] = []

  async getTopParticipants(topN: number): Promise<ILeaderboardEntry[]> {
    return this.participants.slice(0, topN)
  }

  async getParticipantRank(userId: string): Promise<number> {
    for (let i = 0; i < this.participants.length; i++) {
      if (this.participants[i].userId === userId) {
        return i + 1 // Rank is 1-based
      }
    }
    return -1 // Not found
  }

  async recordScore(userId: string, points: number): Promise<boolean> {
    const participant = this.participants.find((p) => p.userId === userId)
    if (participant) {
      participant.score += points
    } else {
      this.participants.push({
        userId,
        rank: 0,
        score: points,
        prevRoundScore: 0,
        percentChange: 0,
        absoluteChange: 0,
      })
    }
    this.sortParticipants()
    return true
  }

  private sortParticipants(): void {
    this.participants.sort((a, b) => b.points - a.points)
  }
}
