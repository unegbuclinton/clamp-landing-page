import path from 'path'
import express from 'express'
import { CustomerAccountService } from '../services/customerAccount'

export const getAllCustomerAccounts = async (req: express.Request, res: express.Response) => {
  try {
    const customerAccounts = await CustomerAccountService.getAllCustomerAccounts()
    res.json(customerAccounts)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
}

export const getCustomerAccountById = async (req: express.Request, res: express.Response) => {
  const id: string = req.params.id

  try {
    const customerAccount = await CustomerAccountService.getCustomerAccountById(id)

    if (customerAccount) {
      res.json(customerAccount)
    } else {
      res.status(404).send('CustomerAccount not found')
    }
  } catch (e: any) {
    console.log(e)
    res.status(500).send('Something went wrong')
  }
}

export const createCustomerAccount = async (req: express.Request, res: express.Response) => {
  try {
    const customerAccount = await CustomerAccountService.createCustomerAccount(req.body)
    res.status(201).json(customerAccount)
  } catch (e: any) {
    console.log(e)
    res.status(500).send('Something went wrong')
  }
}

export const updateCustomerAccount = async (req: express.Request, res: express.Response) => {
  const id: string = req.params.id

  try {
    const updatedCustomerAccount = await CustomerAccountService.updateCustomerAccount(id, req.body)

    if (updatedCustomerAccount) {
      res.json(updatedCustomerAccount)
    } else {
      res.status(404).send('CustomerAccount not found')
    }
  } catch (e: any) {
    res.status(500).send(e.message)
  }
}

export const importCustomerAccountsFromFile = async (
  req: express.Request,
  res: express.Response
) => {
  const fPath = req.file?.path
  if (!fPath) {
    return res.status(400).json({
      msg: 'File missing',
    })
  }
  const filePath = path.join(__dirname, fPath)

  try {
    const importOperationId = await CustomerAccountService.importCustomerAccountsFromFile(filePath)
    if (importOperationId) {
      res.json({ importOperationId })
    } else {
      res.status(500).send('Something went wrong')
    }
  } catch (e: any) {
    res.status(500).send(e.message)
  }
}
