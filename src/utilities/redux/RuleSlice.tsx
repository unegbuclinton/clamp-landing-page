import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createCampaignInterface, ruleInterface } from '../types/createCampaign'
import { createNewCampaign, getSingleCampaign } from '@/api/campaign'
import { getSingleRule } from '@/api/rules'

interface ruleState {
  specificRule: ruleInterface
}
const initialState = {
  specificRule: {},
} as ruleState

export const getSpecificRule = createAsyncThunk(
  'rule/getSpecificRule',
  getSingleRule
)
export const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSpecificRule.fulfilled, (state, action) => {
      state.specificRule = action.payload
    })
  },
})

export default campaignSlice.reducer
