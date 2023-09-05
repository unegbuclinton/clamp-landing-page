import express from 'express'
import {
  getAllGames,
  getGameById,
  endGame,
  endRound,
  nextRound,
  startGame,
  initNewGame,
  updateGameStatuses,
} from '../controllers/game'

const router = express.Router()

router.get('/', getAllGames)
router.get('/:id', getGameById)
router.post('/:id/rounds/new', nextRound)
router.post('/', initNewGame)
router.put('/:id/start', startGame)
router.put('/:id/end', endGame)
router.put('/:id/rounds/end', endRound)
router.post('/periodic-updates', updateGameStatuses)

export default router
