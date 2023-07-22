import { createSlice } from "@reduxjs/toolkit";

interface campaignState {
  createCampaignData: {
    campaignName: string;
    campaignTrigger: number;
    campaignEarnings: number;
    campaignRedeem: number;
    campaignReward: number;
  };
  redemptionType: string;
}
const initialState = {
  createCampaignData: {
    campaignName: "",
    campaignReward: 5,
    campaignEarnings: 1,
    campaignRedeem: 1,
    campaignTrigger: 1,
  },
  redemptionType: "Cashback",
} as campaignState;

export const campaignSlice = createSlice({
  name: "campaign",
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
