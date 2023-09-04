import express from 'express'
import { getTopParticipants, getParticipantRank, recordScore } from '../controllers/leaderboard'

const router = express.Router()

router.get('/top', getTopParticipants)
router.get('/rank/:userId/:roundId', getParticipantRank)
router.post('/record', recordScore)

export default router
