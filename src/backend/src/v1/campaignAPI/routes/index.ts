import express, { Request, Response } from 'express'
import campaignRouter from './campaign'
import ruleRouter from './rule'
import triggerRouter from './trigger'
import assetRouter from './asset'
import customerAccountRouter from './customerAccount'

const router = express.Router()

// Mount the routers
router.use('/campaigns', campaignRouter)
router.use('/rules', ruleRouter)
router.use('/triggers', triggerRouter)
router.use('/assets', assetRouter)
router.use('/customerAccounts', customerAccountRouter)
router.get('/health', (_req: Request, res: Response) => {
  res.json({ message: 'Clamp API [Core]. Status OK' })
})

export default router
