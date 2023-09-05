import express from 'express'
import { addScore, getUserScores, getRoundScores } from '../controllers/score'

const router = express.Router()

router.post('/', addScore)
router.get('/user/:userId', getUserScores)
router.get('/round/:roundId', getRoundScores)

export default router
