import mongoose from 'mongoose'

export interface IAsset extends mongoose.Document {
  id: string
  name: string
  category: string
  type: string
  tags: string[]
  value: string
  monetaryValue: string
  currency: string
  pointValue: string
  data: string
  status: string
  createdAt: Date
  updatedAt: Date
}

const AssetSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    tags: [String],
    value: { type: String, required: true },
    monetaryValue: { type: String, required: true },
    currency: { type: String, required: true },
    pointValue: { type: String, required: true },
    data: { type: String, required: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

AssetSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret._id
    return ret
  },
})

export const Asset = mongoose.model<IAsset>('Asset', AssetSchema)
