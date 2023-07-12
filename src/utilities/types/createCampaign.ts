export interface createCampaignInterface {
  id: string
  name: string
  startDate: string
  endDate: string
  ruleIds: string[]
  status: string
  redemptionRules: RedemptionRule[]
}

interface RedemptionRule {
  assetConditions: AssetCondition[]
  customerConditions: CustomerCondition[]
  liquidationInstrument: string
  redeemableFrom: string
  redeemableUntil: string
}

interface AssetCondition {
  key: string
  operator: string
  value: string
}

interface CustomerCondition {
  key: string
  operator: string
  value: string
}

export interface triggerInterface {
  id: string
  eventName: string
  customerId: string
  payload: {
    product_id: string
    quantity: number
  }
  status: string
}

export interface ruleInterface {
  id: string
  assetId: string
  assetQty: number
  eventName: string
  conditions: Condition[]
  multiplier: Multiplier
}

interface Condition {
  key: string
  operator: string
  value: string
}

interface Multiplier {
  key: string
  multiple: number
}

export interface assetsInterface {
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
}
