import {
  assetsInterface,
  createCampaignInterface,
  triggerInterface,
} from '@/utilities/types/createCampaign'
import axios from 'axios'
const baseURL = 'https://clamp-service-g76glnnspa-ez.a.run.app/clamp-api/core'
export const createNewCampaign = async (body: createCampaignInterface) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${baseURL}/campaigns`,
      data: body,
    })
    // console.log(response)
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
