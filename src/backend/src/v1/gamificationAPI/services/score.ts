import { IScore, IScoreService } from '../interfaces/IScore'
import { Score } from '../models/Score'

export class ScoreService implements IScoreService {
  constructor() {}

  async addScore(userId: string, points: number, roundId: string): Promise<IScore> {
    const score = new Score({ userId, points, roundId })
    await score.save()
    return score
  }

  async getUserScores(userId: string): Promise<IScore[]> {
    return await Score.find({ userId })
  }

  async getRoundScores(roundId: string): Promise<IScore[]> {
    return await Score.find({ roundId })
  }
}
