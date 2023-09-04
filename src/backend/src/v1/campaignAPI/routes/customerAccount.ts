import express from 'express'
import multer from 'multer'

import {
  getAllCustomerAccounts,
  getCustomerAccountById,
  createCustomerAccount,
  updateCustomerAccount,
  importCustomerAccountsFromFile,
} from '../controllers/customerAccount'

const router = express.Router()
// Configure multer storage
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (_req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1])
  },
})
const upload = multer({ storage: storage })
// Customer Account routes
router.get('/', getAllCustomerAccounts)
router.get('/:id', getCustomerAccountById)
router.post('/', createCustomerAccount)
router.put('/:id', updateCustomerAccount)
router.post('/upload', upload.single('file'), importCustomerAccountsFromFile)

export default router
