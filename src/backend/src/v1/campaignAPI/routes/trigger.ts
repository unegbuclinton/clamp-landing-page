import express from 'express'
import {
  getAllTriggers,
  getTriggerById,
  createTrigger,
  updateTrigger,
} from '../controllers/trigger'

const router = express.Router()

// Trigger routes
router.get('/', getAllTriggers)
router.get('/:id', getTriggerById)
router.post('/', createTrigger)
router.put('/:id', updateTrigger)

export default router
