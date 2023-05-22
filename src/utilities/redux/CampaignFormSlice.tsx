import { createSlice } from "@reduxjs/toolkit";

interface campaignState {
  createCampaignData: {
    campaignName: string;
    campaignTrigger: number;
    campaignEarnings: number;
    campaignRedeem: number;
    campaignCashBack: number;
    campaignDiscount: number;
  };
}
const initialState = {
  createCampaignData: {
    campaignName: "",
    campaignCashBack: 5,
    campaignDiscount: 5,
    campaignEarnings: 1,
    campaignRedeem: 1,
    campaignTrigger: 1,
  },
} as campaignState;

export const campaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    getCampaignData: (state, action) => {
      state.createCampaignData = action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(getAllProperties.fulfilled, (state, action) => {
    //   state.buyProperties = action.payload;
    // });
  },
});
export const { getCampaignData } = campaignSlice.actions;
export default campaignSlice.reducer;
