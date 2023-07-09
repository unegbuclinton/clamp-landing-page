import { createSlice } from '@reduxjs/toolkit';

interface campaignState {
  createCampaignData: {
    campaignName: string;
    campaignTriggerValue: number;
    campaignEarnings: number;
    campaignRedeem: number;
    campaignStartDate: number;
    campaignEndDate: number;
    campaignTrigger: string;
    campaignReward: number;
  };
  redemptionType: string;
}
const initialState = {
  createCampaignData: {
    campaignName: '',
    campaignReward: 5,
    campaignEarnings: 1,
    campaignRedeem: 1,
    campaignStartDate: 2023 - 7 - 0,
    campaignEndDate: 2023 - 8 - 31,
    campaignTrigger: '',
    campaignTriggerValue: 1,
  },
  redemptionType: 'Cashback',
} as campaignState;

export const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    getCampaignData: (state, action) => {
      state.createCampaignData = action.payload;
    },
    getRedemptiontype: (state, action) => {
      state.redemptionType = action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(getAllProperties.fulfilled, (state, action) => {
    //   state.buyProperties = action.payload;
    // });
  },
});
export const { getCampaignData, getRedemptiontype } = campaignSlice.actions;
export default campaignSlice.reducer;
