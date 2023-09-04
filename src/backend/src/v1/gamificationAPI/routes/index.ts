import express, { Request, Response } from 'express'
import gameRouter from './game'
import ruleRouter from './leaderboard'
import assetRouter from './game'

const router = express.Router()

// Mount the routers
router.use('/games', gameRouter)
router.use('/rules', ruleRouter)
router.use('/assets', assetRouter)
router.get('/health', (_req: Request, res: Response) => {
  res.json({ message: 'Clamp API [Core]. Status OK' })
})

export default router
