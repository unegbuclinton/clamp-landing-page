import express from 'express'
import {
  getCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  pauseCampaign,
  stopCampaign,
  resumeCampaign,
  startCampaign,
  enrollCustomer,
  enrollCustomersByImportId,
} from '../controllers/campaign'

const router = express.Router()

// Campaign routes
router.get('/', getCampaigns)
router.get('/:id', getCampaignById)
router.post('/:id/pause', pauseCampaign)
router.post('/:id/stop', stopCampaign)
router.post('/:id/resume', resumeCampaign)
router.post('/:id/start', startCampaign)
router.post('/', createCampaign)
router.put('/:id', updateCampaign)
router.post('/:campaignId/enrollments/:customerId', enrollCustomer)
router.post('/:campaignId/bulk-enrollments/:importOperationId', enrollCustomer)

export default router
