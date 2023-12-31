import {
  assetsInterface,
  createCampaignInterface,
  triggerInterface,
} from '@/utilities/types/createCampaign'
import { message } from 'antd'
import axios from 'axios'
import { API_URL } from './config'


const baseURL = `${API_URL}/core`
export const createNewCampaign = async (body: createCampaignInterface) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${baseURL}/campaigns`,
      data: body,
    })
    return response.data
  } catch (error: any) {
    return error
  }
}

export const getCampaigns = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `${baseURL}/campaigns`,
    })
    return response.data
  } catch (error: any) {
    return error
  }
}
export const getSingleCampaign = async (id: string) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${baseURL}/campaigns/${id}`,
    })
    // console.log(response)
    return response.data
  } catch (error: any) {
    return error
  }
}

export const pauseCampaign = async (id: string) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${baseURL}/campaigns/${id}/pause`,
    })
    const specificCampaign = await getSingleCampaign(response.data.id)
    message.info('Campaign Paused')
    return specificCampaign
  } catch (error: any) {
    return error
  }
}

export const startCampaign = async (id: string) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${baseURL}/campaigns/${id}/start`,
    })
    const specificCampaign = await getSingleCampaign(response.data.id)
    message.info('Campaign started')
    return specificCampaign
  } catch (error: any) {
    return error
  }
}

export const resumeCampaign = async (id: string) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${baseURL}/campaigns/${id}/resume`,
    })

    const specificCampaign = await getSingleCampaign(response.data.id)
    message.info('Campaign Resumed')
    return specificCampaign
  } catch (error: any) {
    return error
  }
}
export const endCampaign = async (id: string) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${baseURL}/campaigns/${id}/stop`,
    })
    const specificCampaign = await getSingleCampaign(response.data.id)
    message.info('Campaign Ended')
    return specificCampaign
  } catch (error: any) {
    return error
  }
}

export const updateCampaign = async ({
  body,
  id,
}: {
  body: createCampaignInterface
  id: string
}) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${baseURL}/campaigns${id}`,
      data: body,
    })
    const createdCampaign = await getSingleCampaign(response.data.id)
    return createdCampaign
  } catch (error: any) {
    return error
  }
}

export const createTrigger = async (body: triggerInterface) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${baseURL}/triggers`,
      data: body,
    })
    console.log(response)
    return response.data
  } catch (error: any) {
    return error
  }
}

export const createAssets = async (body: assetsInterface) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${baseURL}/assets`,
      data: body,
    })
    console.log(response)
    return response.data
  } catch (error: any) {
    return error
  }
}

export const bulkEnrol = async (importOpId:string, campaignId:string) =>{
  const {data} = await axios({
    method:'post',
    url: `${baseURL}/${campaignId}/bulk-enrollments/${importOpId}`
  })
  return data

}