import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createCampaignInterface } from '../types/createCampaign'
import { getCampaigns, getSingleCampaign } from '@/api/campaign'

interface campaignState {
  createCampaignData: {
    campaignName: string
    campaignTriggerValue: any
    campaignEarnings: number
    campaignRedeem: number
    campaignTrigger: string
    campaignReward: number
    earningType: string
  }
  redemptionType: { type: string; id: number }
  specificCampaign: createCampaignInterface
  allCampaigns: Array<createCampaignInterface>
  ruleOperator: { operator: string; value: string }
  campaignStartDate: string
  campaignEndDate: string
}
const initialState = {
  createCampaignData: {
    campaignName: '',
    campaignReward: 5,
    campaignEarnings: 2,
    campaignRedeem: 5,
    campaignTrigger: 'Select Trigger',
    campaignTriggerValue: '',
    earningType: 'Earning type',
  },
  specificCampaign: {},
  allCampaigns: [{}],
  redemptionType: { type: 'Cashback', id: 0 },
  ruleOperator: {},
  campaignStartDate: new Date().toISOString().split('T')[0],
  campaignEndDate: new Date().toISOString().split('T')[0],
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
    clearState: (state) => {
      state.createCampaignData = initialState.createCampaignData
      state.campaignEndDate = initialState.campaignEndDate
      state.campaignStartDate = initialState.campaignStartDate
    },
    getCampaignData: (state, action) => {
      state.createCampaignData = action.payload
    },
    getRedemptiontype: (state, action) => {
      state.redemptionType = action.payload
    },
    getRuleOperator: (state, action) => {
      state.ruleOperator = action.payload
    },
    setCampaignStartDate: (state, action) => {
      state.campaignStartDate = action.payload
    },
    setCampaignEndDate: (state, action) => {
      state.campaignEndDate = action.payload
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
export const {
  getCampaignData,
  setCampaignStartDate,
  setCampaignEndDate,
  getRedemptiontype,
  getRuleOperator,
  clearState,
} = campaignSlice.actions
export default campaignSlice.reducer
