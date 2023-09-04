import { Request, Response } from 'express'
import { TriggerService } from '../services/trigger'

export const getAllTriggers = async (req: Request, res: Response): Promise<void> => {
  try {
    const triggers = await TriggerService.getAllTriggers()
    res.json(triggers)
  } catch (error: any) {
    res.status(500).send(error.message)
  }
}

export const getTriggerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const trigger = await TriggerService.getTriggerById(req.params.id)
    if (trigger) {
      res.json(trigger)
    } else {
      res.status(404).send('Trigger not found')
    }
  } catch (error: any) {
    res.status(500).send(error.message)
  }
}

export const createTrigger = async (req: Request, res: Response): Promise<void> => {
  try {
    const trigger = await TriggerService.createTrigger(req.body)
    res.status(201).json(trigger)
  } catch (error: any) {
    res.status(500).send(error.message)
  }
}

export const updateTrigger = async (req: Request, res: Response): Promise<void> => {
  try {
    const trigger = await TriggerService.updateTrigger(req.params.id, req.body)
    if (trigger) {
      res.json(trigger)
    } else {
      res.status(404).send('Trigger not found')
    }
  } catch (error: any) {
    res.status(500).send(error.message)
  }
}
