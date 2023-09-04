import { Request, Response } from 'express'
import { AssetService } from '../services/asset'

export const getAllAssets = async (req: Request, res: Response): Promise<void> => {
  try {
    const assets = await AssetService.getAllAssets()
    res.json(assets)
  } catch (error: any) {
    res.status(500).send(error.message)
  }
}

export const getAssetById = async (req: Request, res: Response): Promise<void> => {
  try {
    const asset = await AssetService.getAssetById(req.params.id)
    if (asset) {
      res.json(asset)
    } else {
      res.status(404).send('Asset not found')
    }
  } catch (error: any) {
    res.status(500).send(error.message)
  }
}

export const createAsset = async (req: Request, res: Response): Promise<void> => {
  try {
    const asset = await AssetService.createAsset(req.body)
    res.status(201).json(asset)
  } catch (error: any) {
    res.status(500).send(error.message)
  }
}

export const updateAsset = async (req: Request, res: Response): Promise<void> => {
  try {
    const asset = await AssetService.updateAsset(req.params.id, req.body)
    if (asset) {
      res.json(asset)
    } else {
      res.status(404).send('Asset not found')
    }
  } catch (error: any) {
    res.status(500).send(error.message)
  }
}
