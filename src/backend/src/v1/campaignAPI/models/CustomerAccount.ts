import mongoose, { Schema } from 'mongoose'

export interface ICustomerAsset {
  assetId: string
  expiryDate: Date
  qty: number
}

const CustomerAssetSchema = new Schema(
  {
    assetId: { type: String, required: true },
    expiryDate: { type: Date, required: true },
    qty: { type: Number, required: true },
  },
  {
    versionKey: false,
    _id: false,
  }
)

export interface ICustomerAccountDraft {
  id?: string
  campaignIds: string[]
  assets: ICustomerAsset[]
  customerData: Record<string, any>
}
export interface ICustomerAccount extends ICustomerAccountDraft {
  id: string
  createdAt: Date
  updatedAt: Date
}

const CustomerAccountSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    campaignIds: { type: [String], required: true },
    customerData: { type: Schema.Types.Mixed, required: true },
    assets: [CustomerAssetSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

CustomerAccountSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret._id
    return ret
  },
})

export const CustomerAccount = mongoose.model<ICustomerAccount>(
  'CustomerAccount',
  CustomerAccountSchema
)
