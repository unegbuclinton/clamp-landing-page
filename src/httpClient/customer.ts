import { API_URL } from "./config"

export const importCustomerCSV = async (file: File):Promise<{importOperationId:string}> => {
    const formData = new FormData()
    formData.append('file', file)

   const response = await fetch(`${API_URL}/core/customerAccounts/upload`, {
      method: 'POST',
      body: formData,
    })
    return await response.json()
  }
