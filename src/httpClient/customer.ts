import { API_URL } from "./config"

export const importCustomerCSV = (file: File) => {
    const formData = new FormData()
    formData.append('csvFile', file)

    fetch(`${API_URL}/clamp-api/core/customerAccounts/upload`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }
