import { ruleInterface } from '@/utilities/types/createCampaign'
import { message } from 'antd'
import axios from 'axios'

const baseURL = 'https://clamp-service-g76glnnspa-ez.a.run.app/clamp-api/core'
// const baseURL = 'http://localhost:8080/clamp-api/core'

export const createNewRule = async (body: ruleInterface) => {
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
      url: `${baseURL}/rules/${id}`,
    })
    // console.log(response)
    return response.data
  } catch (error: any) {
    return error
  }
}
