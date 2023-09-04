import express from 'express'
import {
  getTopParticipants,
  getParticipantRank,
  updateRankings,
  getLeaderboard,
} from '../controllers/leaderboard'

const router = express.Router()

router.get('/:roundId/top/:n', getTopParticipants)
router.get('/rank/:userId/:roundId', getParticipantRank)
router.put('/rank/:roundId', updateRankings)
router.get('/:roundId', getLeaderboard)
export default router
