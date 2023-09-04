import { Asset, IAsset } from '../models/Asset'

const getAllAssets = async (): Promise<IAsset[]> => {
  return Asset.find().exec()
}

const getAssetById = async (id: string): Promise<IAsset | null> => {
  return Asset.findById(id).exec()
}

const createAsset = async (assetData: Partial<IAsset>): Promise<IAsset> => {
  const newAsset = new Asset(assetData)
  return newAsset.save()
}

const updateAsset = async (id: string, assetData: Partial<IAsset>): Promise<IAsset | null> => {
  return Asset.findByIdAndUpdate(id, assetData, { new: true }).exec()
}

export const AssetService = {
  getAllAssets,
  getAssetById,
  createAsset,
  updateAsset,
}
