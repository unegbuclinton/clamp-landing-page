import {
  assetsInterface,
  createCampaign,
  ruleInterface,
  triggerInterface,
} from '@/utilities/types/createCampaign'
import axios from 'axios'
const apiKey = 'https://clamp-service-g76glnnspa-ez.a.run.app/clamp-api/core'
export const createNewCampaign = async (body: createCampaign) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${apiKey}/campaigns`,
      data: body,
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
      url: `${apiKey}/triggers`,
      data: body,
    })
    console.log(response)
    return response.data
  } catch (error: any) {
    return error
  }
}

export const createRule = async (body: ruleInterface) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${apiKey}/rules`,
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
      url: `${apiKey}/assets`,
      data: body,
    })
    console.log(response)
    return response.data
  } catch (error: any) {
    return error
  }
}
