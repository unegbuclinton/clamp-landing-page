import express from 'express'
import {
  getAllGames,
  getGameById,
  endGame,
  endRound,
  nextRound,
  startGame,
  initNewGame,
} from '../controllers/game'

const router = express.Router()

// Asset routes
router.get('/', getAllGames)
router.get('/:id', getGameById)
router.post('/:id/rounds/new', nextRound)
router.post('/', initNewGame)
router.put('/:id/start', startGame)
router.put('/:id/end', endGame)
router.put('/:id/rounds/end', endRound)

export default router
