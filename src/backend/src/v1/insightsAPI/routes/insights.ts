import express from 'express'
import {
  getCustomerAssetBalance,
  getCustomerPurchasePredictions,
  getCampaignOverview,
  getCampaignHighlights,
  getUserLoyaltyScores,
} from '../controllers/insights'

const router = express.Router()

// Insights routes
router.get('/customers/:customerId/assetBalance', getCustomerAssetBalance)
router.get('/customers/:customerId/predictions', getCustomerPurchasePredictions)
router.get('/campaigns/overview', getCampaignOverview)
router.get('/campaigns/:campaignId/highlights', getCampaignHighlights)
router.get('/userLoyaltyScores', getUserLoyaltyScores)

router.get('/health', (req, res) => {
  res.json({ message: 'Clamp Insights API. Status OK' })
})

// Add other routes as required

export default router
