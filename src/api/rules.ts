import { ruleInterface } from '@/utilities/types/createCampaign'
import axios from 'axios'

const baseURL = 'https://clamp-service-g76glnnspa-ez.a.run.app/clamp-api/core'

export const createRule = async (body: ruleInterface) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${baseURL}/rules`,
      data: body,
    })
    return response.data
  } catch (error: any) {
    return error
  }
}

export const getRules = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `${baseURL}/rules`,
    })

    return response.data
  } catch (error: any) {
    return error
  }
}

export const getSingleRule = async (id: string) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${baseURL}/rules/${id}`,
    })
    // console.log(response)
    return response.data
  } catch (error: any) {
    return error
  }
}
