import express from 'express'
import { getAllAssets, getAssetById, createAsset, updateAsset } from '../controllers/asset'

const router = express.Router()

// Asset routes
router.get('/', getAllAssets)
router.get('/:id', getAssetById)
router.post('/', createAsset)
router.put('/:id', updateAsset)

export default router
