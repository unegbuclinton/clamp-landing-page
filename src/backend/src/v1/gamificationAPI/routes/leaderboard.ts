import express from 'express'
import { getAllRules, getRuleById, createRule, updateRule } from '../controllers/rule'

const router = express.Router()

// Rule routes
router.get('/', getAllRules)
router.get('/:id', getRuleById)
router.post('/', createRule)
router.put('/:id', updateRule)

export default router
