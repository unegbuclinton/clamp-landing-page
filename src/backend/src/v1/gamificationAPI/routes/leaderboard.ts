import express from 'express'
import { getTopParticipants, getParticipantRank, updateRankings } from '../controllers/leaderboard'

const router = express.Router()

router.get('/top', getTopParticipants)
router.get('/rank/:userId/:roundId', getParticipantRank)
router.put('/rank/:roundId', updateRankings)

export default router
