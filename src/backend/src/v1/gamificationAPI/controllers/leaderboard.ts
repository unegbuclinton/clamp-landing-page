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

export const updateRankings = async (req: Request, res: Response): Promise<void> => {
  try {
    const { game, statKey } = req.body
    const success = await leaderboardService.updateRankings(game, statKey)
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
