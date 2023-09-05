import express from 'express'
import { getTopParticipants, getLeaderboard } from '../controllers/leaderboard'

const router = express.Router()

router.get('/:roundId/top/:n', getTopParticipants)
router.get('/:roundId', getLeaderboard)

export default router
