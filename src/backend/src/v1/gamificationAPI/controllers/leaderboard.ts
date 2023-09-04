import { Request, Response } from 'express'
import { LeaderboardService } from '../services/leaderboard'

const leaderboardService = new LeaderboardService()

export const getTopParticipants = async (req: Request, res: Response): Promise<void> => {
  const { roundId, n } = req.params
  try {
    const topN = Number(n || 10)
    const entries = await leaderboardService.getTopParticipants(topN, roundId)
    res.json(entries)
  } catch (error: any) {
    console.log(error)
    res.status(500).send('Something went wrong.')
  }
}

export const getParticipantRank = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, roundId } = req.params
    const rank = await leaderboardService.getParticipantRank(userId, roundId)
    res.json({ rank })
  } catch (error: any) {
    console.log(error)
    res.status(500).send('Something went wrong.')
  }
}

export const updateRankings = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roundId } = req.body
    const success = await leaderboardService.updateRankings(roundId)
    if (success) {
      res.json({ message: 'Score recorded successfully.' })
    } else {
      res.status(500).send('Failed to record score.')
    }
  } catch (error: any) {
    console.log(error)
    res.status(500).send('Something went wrong.')
  }
}

export const getLeaderboard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roundId } = req.params
    const leaderboard = await leaderboardService.getLeaderboard(roundId)
    res.json(leaderboard)
  } catch (error: any) {
    console.log(error)
    res.status(500).send('Something went wrong.')
  }
}
