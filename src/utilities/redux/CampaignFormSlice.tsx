import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createCampaignInterface } from '../types/createCampaign'
import { getCampaigns, getSingleCampaign } from '@/api/campaign'

interface campaignState {
  createCampaignData: {
    campaignName: string
    campaignTriggerValue: number
    campaignEarnings: number
    campaignRedeem: number
    campaignStartDate: string
    campaignEndDate: string
    campaignTrigger: string
    campaignReward: number
    earningType: string
  }
  redemptionType: string
  specificCampaign: createCampaignInterface
  allCampaigns: Array<createCampaignInterface>
  ruleOperator: { operator: string; value: string }
}
const initialState = {
  createCampaignData: {
    campaignName: '',
    campaignReward: 5,
    campaignEarnings: 1,
    campaignRedeem: 1,
    campaignStartDate: new Date().toISOString().split('T')[0],
    campaignEndDate: new Date().toISOString().split('T')[0],
    campaignTrigger: 'Select Trigger',
    campaignTriggerValue: 1,
    earningType: 'Earning type',
  },
  specificCampaign: {},
  allCampaigns: [{}],
  redemptionType: 'Cashback',
  ruleOperator: {},
} as campaignState

export const getAllCampaign = createAsyncThunk(
  'campaign/getAllCampaign',
  getCampaigns
)
export const getSpecificCampaign = createAsyncThunk(
  'campaign/getSingleCampaign',
  getSingleCampaign
)
export const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    getCampaignData: (state, action) => {
      state.createCampaignData = action.payload
    },
    getRedemptiontype: (state, action) => {
      state.redemptionType = action.payload
    },
    getRuleOperator: (state, action) => {
      state.ruleOperator = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSpecificCampaign.fulfilled, (state, action) => {
      state.specificCampaign = action.payload
    })
    builder.addCase(getAllCampaign.fulfilled, (state, action) => {
      state.allCampaigns = action.payload
    })
  },
})
export const { getCampaignData, getRedemptiontype, getRuleOperator } =
  campaignSlice.actions
export default campaignSlice.reducer
