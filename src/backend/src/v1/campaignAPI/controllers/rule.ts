import { Request, Response } from 'express'
import { RuleService } from '../services/rule'

export const getAllRules = async (req: Request, res: Response): Promise<void> => {
  try {
    const rules = await RuleService.getAllRules()
    res.json(rules)
  } catch (error: any) {
    res.status(500).send(error.message)
  }
}

export const getRuleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const rule = await RuleService.getRuleById(req.params.id)
    if (rule) {
      res.json(rule)
    } else {
      res.status(404).send('Rule not found')
    }
  } catch (error: any) {
    console.log(error)
    res.status(500).send(error.name)
  }
}

export const createRule = async (req: Request, res: Response): Promise<void> => {
  try {
    const rule = await RuleService.createRule(req.body)
    res.status(201).json(rule)
  } catch (error: any) {
    res.status(500).send(error)
  }
}

export const updateRule = async (req: Request, res: Response): Promise<void> => {
  try {
    const rule = await RuleService.updateRule(req.params.id, req.body)
    if (rule) {
      res.json(rule)
    } else {
      res.status(404).send('Rule not found')
    }
  } catch (error: any) {
    res.status(500).send(error.message)
  }
}
