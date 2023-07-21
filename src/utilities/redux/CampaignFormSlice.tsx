import { createSlice } from '@reduxjs/toolkit'

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
  redemptionType: 'Cashback',
  ruleOperator: {},
} as campaignState

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
    // builder.addCase(getAllProperties.fulfilled, (state, action) => {
    //   state.buyProperties = action.payload;
    // });
  },
})
export const { getCampaignData, getRedemptiontype, getRuleOperator } =
  campaignSlice.actions
export default campaignSlice.reducer
