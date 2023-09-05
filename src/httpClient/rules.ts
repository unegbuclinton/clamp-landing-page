import { ruleInterface } from '@/utilities/types/createCampaign'
import { message } from 'antd'
import axios from 'axios'
import { API_URL } from "./config"

const baseURL = `${API_URL}/core/rules`

export const createNewRule = async (body: ruleInterface) => {
  try {
    const response = await axios({
      method: 'post',
      url: baseURL,
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
      url: baseURL,
    })

    return response.data
  } catch (error: any) {
    return error
  }
}
export const updateRule = async ({
  body,
  id,
}: {
  body: ruleInterface
  id: string
}) => {
  message.info('Will be updated soon')
  // try {
  //   const response = await axios({
  //     method: 'put',
  //     url: `${baseURL}/rules${id}`,
  //     data: body,
  //   })
  //   return response.data
  // } catch (error: any) {
  //   return error
  // }
}

export const getSingleRule = async (id: string) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${baseURL}/${id}`,
    })
    // console.log(response)
    return response.data
  } catch (error: any) {
    return error
  }
}
