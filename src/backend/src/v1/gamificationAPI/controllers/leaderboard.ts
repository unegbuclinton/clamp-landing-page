import { Request, Response } from 'express'
import { LeaderboardService } from '../services/leaderboard'

const leaderboardService = new LeaderboardService()

export const getTopParticipants = async (req: Request, res: Response): Promise<void> => {
  try {
    const topN = Number(req.query.topN || 10)
    const entries = await leaderboardService.getTopParticipants(topN)
    res.json(entries)
  } catch (error: any) {
    res.status(500).send(error.message)
  }
}

export const getParticipantRank = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, roundId } = req.params
    const rank = await leaderboardService.getParticipantRank(userId, roundId)
    res.json({ rank })
  } catch (error: any) {
    res.status(500).send(error.message)
  }
}

export const recordScore = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, points, roundId } = req.body
    const success = await leaderboardService.recordScore(userId, points, roundId)
    if (success) {
      res.json({ message: 'Score recorded successfully.' })
    } else {
      res.status(500).send('Failed to record score.')
    }
  } catch (error: any) {
    res.status(500).send(error.message)
  }
}
