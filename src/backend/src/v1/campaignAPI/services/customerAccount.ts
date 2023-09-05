import csv from 'csvtojson'
import { v4 as uuidv4 } from 'uuid'
import { CustomerAccount, ICustomerAccount, ICustomerAccountDraft } from '../models/CustomerAccount'

const getAllCustomerAccounts = async (): Promise<ICustomerAccount[]> => {
  return await CustomerAccount.find().exec()
}

const getCustomerAccountById = async (id: string): Promise<ICustomerAccount | null> => {
  return await CustomerAccount.findOne({ id }).exec()
}

const createCustomerAccount = async (
  accountData: Partial<ICustomerAccount>
): Promise<ICustomerAccount> => {
  const newAccount = new CustomerAccount(accountData)
  return await newAccount.save()
}

const updateCustomerAccount = async (
  id: string,
  accountData: Partial<ICustomerAccount>
): Promise<ICustomerAccount | null> => {
  return CustomerAccount.findByIdAndUpdate(id, accountData, { new: true }).exec()
}

const importCustomerAccountsFromFile = async (filePath: string): Promise<string | null> => {
  const importOperationId = uuidv4()
  try {
    const jsonArray = await csv().fromFile(filePath)
    const sanitisedJsonArray: ICustomerAccountDraft[] = jsonArray.map((json) => {
      return {
        id: uuidv4(),
        assets: [],
        campaignIds: [],
        customerData: {
          id: json.id,
          name: json.name,
          email: json.email,
          phone: json.phone,
          address: json.address,
          city: json.city,
          state: json.state,
          zip: json.zip,
          country: json.country,
          metadata: {
            importOperationId,
            importedAt: new Date(),
          },
        },
      }
    })
    await CustomerAccount.insertMany(sanitisedJsonArray)
    return importOperationId
  } catch (err) {
    console.log(err)
    return null
  }
}

export const CustomerAccountService = {
  getAllCustomerAccounts,
  getCustomerAccountById,
  createCustomerAccount,
  updateCustomerAccount,
  importCustomerAccountsFromFile,
}
