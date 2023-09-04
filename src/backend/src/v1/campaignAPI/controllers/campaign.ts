import { Request, Response } from 'express'
import { CampaignService } from '../services/campaign'

export const getCampaigns = async (req: Request, res: Response) => {
  try {
    const campaigns = await CampaignService.getAllCampaigns()
    res.json(campaigns)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
}

export const getCampaignById = async (req: Request, res: Response) => {
  const id: string = req.params.id

  try {
    const campaign = await CampaignService.getCampaignById(id)

    if (campaign) {
      res.json(campaign)
    } else {
      res.status(404).json({ error: 'Campaign not found' })
    }
  } catch (e: any) {
    res.status(500).send(e.message)
  }
}

export const createCampaign = async (req: Request, res: Response) => {
  try {
    const campaign = await CampaignService.createCampaign(req.body)
    res.status(201).json(campaign)
  } catch (e: any) {
    console.error(e)
    res.status(500).send({ error: e.message })
  }
}

export const updateCampaign = async (req: Request, res: Response) => {
  const id: string = req.params.id

  try {
    const updatedCampaign = await CampaignService.updateCampaign(id, req.body)

    if (updatedCampaign) {
      res.json(updatedCampaign)
    } else {
      res.status(404).send('Campaign not found')
    }
  } catch (e: any) {
    res.status(500).send(e.message)
  }
}

export const pauseCampaign = async (req: Request, res: Response) => {
  const id: string = req.params.id

  try {
    const pausedCampaign = await CampaignService.pauseCampaign(id)

    if (pausedCampaign) {
      res.json(pausedCampaign)
    } else {
      res.status(404).json({ msg: 'Campaign not found' })
    }
  } catch (e: any) {
    res.status(500).send(e.message)
  }
}

export const stopCampaign = async (req: Request, res: Response) => {
  const id: string = req.params.id

  try {
    const stoppedCampaign = await CampaignService.stopCampaign(id)

    if (stoppedCampaign) {
      res.json(stoppedCampaign)
    } else {
      res.status(404).json({ msg: 'Campaign not found' })
    }
  } catch (e: any) {
    res.status(500).send(e.message)
  }
}

export const resumeCampaign = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const resumedCampaign = await CampaignService.resumeCampaign(id)
    if (resumedCampaign) {
      res.json(resumedCampaign)
    } else {
      res.status(404).json({ msg: 'Campaign not found' })
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export const startCampaign = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const startedCampaign = await CampaignService.startCampaign(id)
    if (startedCampaign) {
      res.json(startedCampaign)
    } else {
      res.status(404).json({ msg: 'Campaign not found' })
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export const enrollCustomer = async (req: Request, res: Response) => {
  const { campaignId, customerId } = req.params
  console.log({ campaignId, customerId })
  try {
    const hasEnrolled = await CampaignService.enrollCustomer(campaignId, customerId)
    if (hasEnrolled) {
      res.json({ msg: 'Customer enrolled' })
    } else {
      console.log('Customer or campaign not found\n\n\n\n')
      res.status(404).json({ msg: 'Campaign or customer not found' })
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export const enrollCustomersByImportId = async (req: Request, res: Response) => {
  const { importOperationId, campaignId } = req.params
  try {
    const enrolledCount = await CampaignService.enrollCustomersByImportId(
      importOperationId,
      campaignId
    )
    res.json({ enrolledCount })
  } catch (error) {
    res.status(500).send(error.message)
  }
}
