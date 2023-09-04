import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ruleInterface } from '../types/createCampaign'
import { createNewCampaign, getSingleCampaign } from '@/httpClient/campaign'
import { createNewRule, getRules, getSingleRule, updateRule } from '@/httpClient/rules'

interface ruleState {
  allRules: Array<ruleInterface>
  specificRule: ruleInterface
}
const initialState = {
  allRules: [{}],
  specificRule: {},
} as ruleState

// export const getSpecificRule = createAsyncThunk(
//   'rule/getSpecificRule',
//   getSingleRule
// )

export const getAllRules = createAsyncThunk('rule/getAllRules', getRules)

export const createRule = createAsyncThunk('rule/createRule', createNewRule)

export const updateSpecificRule = createAsyncThunk('rule/updateSpecificRule', updateRule)

export const ruleSlice = createSlice({
  name: 'rule',
  initialState,
  reducers: {
    getSpecificRule: (state, action) => {
      state.specificRule = action.payload
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(getSpecificRule.fulfilled, (state, action) => {
    //   state.specificRule = action.payload
    // })

    builder.addCase(getAllRules.fulfilled, (state, action) => {
      state.allRules = action.payload
    })

    builder.addCase(createRule.fulfilled, (state, action) => {
      // state.specificRule = action.payload
    })
    builder.addCase(updateSpecificRule.fulfilled, (state, action) => {
      // state.specificRule = action.payload
    })
  },
})
export const { getSpecificRule } = ruleSlice.actions
export default ruleSlice.reducer
