import { Request, Response } from 'express'
import { InsightService } from '../services/insights'

export const getCustomerAssetBalance = async (req: Request, res: Response) => {
  try {
    const customerId: string = req.params.customerId
    const balance = await InsightService.getCustomerAssetBalance(customerId)
    if (balance) {
      res.json({ balance })
    } else {
      res.status(404).json({ error: 'Customer not found' })
    }
  } catch (e: any) {
    res.status(500).send(e.message)
  }
}

export const getCustomerPurchasePredictions = async (req: Request, res: Response) => {
  try {
    const customerId: string = req.params.customerId
    const predictions = await InsightService.getCustomerPurchasePredictions(customerId)
    if (predictions) {
      res.json(predictions)
    } else {
      res.status(404).json({ error: 'Customer not found' })
    }
  } catch (e: any) {
    res.status(500).send(e.message)
  }
}

export const getCampaignOverview = async (req: Request, res: Response) => {
  const campaignId: string = req.params.campaignId
  try {
    const campaigns = await InsightService.getCampaignOverview(campaignId)
    res.json(campaigns)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
}

export const getCampaignHighlights = async (req: Request, res: Response) => {
  try {
    const campaignId: string = req.params.campaignId
    const highlights = await InsightService.getCampaignHighlights(campaignId)
    if (highlights) {
      res.json(highlights)
    } else {
      res.status(404).json({ error: 'Campaign not found' })
    }
  } catch (e: any) {
    res.status(500).send(e.message)
  }
}

export const getUserLoyaltyScores = async (_req: Request, res: Response) => {
  try {
    const scores = await InsightService.getUserLoyaltyScores()
    res.json(scores)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
}
