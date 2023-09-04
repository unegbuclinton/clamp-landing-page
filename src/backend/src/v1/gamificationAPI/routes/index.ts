import express, { Request, Response } from 'express'
import gameRouter from './game'
import leaderboardRouter from './leaderboard'

const router = express.Router()

// Mount the routers
router.use('/games', gameRouter)
router.use('/leaderboard', leaderboardRouter)
router.get('/health', (_req: Request, res: Response) => {
  res.json({ message: 'Clamp API [Gamification]. Status OK' })
})

export default router
