import { Request, Response } from 'express'
import { GameService } from '../services/game'
import { IDraftGame } from '../interfaces/IGame'

const gameService = new GameService()

export const getGameById = async (req: Request, res: Response): Promise<void> => {
  try {
    const asset = await gameService.getGameById(req.params.id)
    if (asset) {
      res.json(asset)
    } else {
      res.status(404).send('Asset not found')
    }
  } catch (error: any) {
    console.log(error.message)  
    res.status(500).send('Something went wrong')
  }
}

export const endRound = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    await gameService.endRound(id)
    res.json({ message: 'Round ended' })
  } catch (error: any) {
    console.log(error.message)  
    res.status(500).send('Something went wrong')
  }
}

export const nextRound = async (req: Request, res: Response): Promise<void> => {}

export const initNewGame = async (req: Request, res: Response): Promise<void> => {
  try {
    const payload: IDraftGame = req.body
    const game = await gameService.initNewGame(payload)
    if(!game){
       res.status(400).send('Bad request')
       return
    }
    res.json(game)
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send('Something went wrong')
  }
}

export const startGame = async (req: Request, res: Response): Promise<void> => {
  try {
    const game = await gameService.startGame(req.params.campaignId)
    res.json(game)
  } catch (error: any) {
    console.log(error.message)  
    res.status(500).send('Something went wrong')
  }
}

export const endGame = async (req: Request, res: Response): Promise<void> => {}

export const getAllGames = async (req: Request, res: Response): Promise<void> => {
  try {
    const assets = await gameService.getAllGames()
    res.json(assets)
  } catch (error: any) {
    console.log(error.message)  
    res.status(500).send('Something went wrong')
  }
}

export const updateGameStatuses = async (_req: Request, res: Response): Promise<void> => {
  try {
    const updated = await gameService.updateGameStatuses()
    res.json({ updated })
  } catch (error: any) {
    console.log(error.message)  
    res.status(500).send('Something went wrong')
  }
}
