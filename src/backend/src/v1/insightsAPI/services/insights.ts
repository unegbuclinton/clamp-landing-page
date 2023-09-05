// InsightGenerator.ts
import { Campaign } from '../../campaignAPI/models/Campaign'
import { Asset } from '../../campaignAPI/models/Asset'
import { Trigger } from '../../campaignAPI/models/Trigger'
import { CustomerAccount } from '../../campaignAPI/models/CustomerAccount'
import { Rule } from '../../campaignAPI/models/Rule'

export class InsightGenerator {
  static async generateCampaignInsights(): Promise<any> {
    const totalCampaigns = await Campaign.countDocuments()
    const activeCampaigns = await Campaign.countDocuments({ status: 'active' })
    const inactiveCampaigns = totalCampaigns - activeCampaigns

    return {
      totalCampaigns,
      activeCampaigns,
      inactiveCampaigns,
    }
  }

  static async generateAssetInsights(): Promise<any> {
    const totalAssets = await Asset.countDocuments()
    const assetTypes = await Asset.distinct('type')

    return {
      totalAssets,
      assetTypes,
    }
  }

  static async generateTriggerInsights(): Promise<any> {
    const totalTriggers = await Trigger.countDocuments()
    const triggerTypes = await Trigger.distinct('type')

    return {
      totalTriggers,
      triggerTypes,
    }
  }

  static async generateCustomerAccountInsights(): Promise<any> {
    const totalCustomerAccounts = await CustomerAccount.countDocuments()
    const activeCustomerAccounts = await CustomerAccount.countDocuments({ status: 'active' })
    const inactiveCustomerAccounts = totalCustomerAccounts - activeCustomerAccounts

    return {
      totalCustomerAccounts,
      activeCustomerAccounts,
      inactiveCustomerAccounts,
    }
  }

  static async generateRuleInsights(): Promise<any> {
    const totalRules = await Rule.countDocuments()
    const ruleConditions = await Rule.distinct('condition.type')

    return {
      totalRules,
      ruleConditions,
    }
  }

  static async getCustomerAssetBalance(customerId: string): Promise<any> {
    const customerAccount = await CustomerAccount.findOne({ id: customerId })
    if (!customerAccount) throw new Error('Customer not found')
    let totalBalance = 0
    customerAccount.assets.forEach(async (asset) => {
      const { qty, assetId } = asset
      const assetDeets = await Asset.findOne({ id: assetId })
      totalBalance += qty * Number(assetDeets?.monetaryValue)
    })
  }

  static async getCustomerPurchasePredictions(customerId: string): Promise<any> {
    // This is a placeholder as actual predictions would require a predictive model
    return { predictions: ['Product A', 'Product B'] }
  }

  static async getCampaignOverview(campaignId: string): Promise<any> {
    const campaigns = await Campaign.find()
    return { campaigns }
  }

  static async getCampaignHighlights(campaignId: string): Promise<any> {
    const campaign = await Campaign.findOne({ id: campaignId })
    if (!campaign) throw new Error('Campaign not found')
    return {
      highlights: {
        totalBudget: 9800,
        totalSpent: 7000,
        totalConversions: 100,
        totalRevenue: 12000,
        totalProfit: 5000,
      },
    }
  }

  static async getUserLoyaltyScores(): Promise<any> {
    const customers = await CustomerAccount.find()
    // Placeholder: actual computation of loyalty scores would require specific logic
    const scores = customers.map((customer) => ({
      customerId: customer.id,
      score: Math.floor(Math.random() * 100),
    }))
    return { scores }
  }
}

// InsightService.ts
export class InsightService {
  static async getCustomerAssetBalance(customerId: string): Promise<any> {
    return await InsightGenerator.getCustomerAssetBalance(customerId)
  }
  static async getCustomerPurchasePredictions(customerId: string): Promise<any> {
    return await InsightGenerator.getCustomerPurchasePredictions(customerId)
  }
  static async getCampaignOverview(campaignId: string): Promise<any> {
    return await InsightGenerator.getCampaignOverview(campaignId)
  }
  static async getCampaignHighlights(campaignId: string): Promise<any> {
    return await InsightGenerator.getCampaignHighlights(campaignId)
  }
  static async getUserLoyaltyScores(): Promise<any> {
    return await InsightGenerator.getUserLoyaltyScores()
  }

  static async getAllInsights(): Promise<any> {
    const campaignInsights = await InsightGenerator.generateCampaignInsights()
    const assetInsights = await InsightGenerator.generateAssetInsights()
    const triggerInsights = await InsightGenerator.generateTriggerInsights()
    const customerAccountInsights = await InsightGenerator.generateCustomerAccountInsights()
    const ruleInsights = await InsightGenerator.generateRuleInsights()
    const customerAssetBalance = await InsightGenerator.getCustomerAssetBalance('123')
    const customerPurchasePredictions = await InsightGenerator.getCustomerPurchasePredictions('123')
    const campaignOverview = await InsightGenerator.getCampaignOverview('123')
    const campaignHighlights = await InsightGenerator.getCampaignHighlights('123')
    const userLoyaltyScores = await InsightGenerator.getUserLoyaltyScores()

    return {
      campaignInsights,
      assetInsights,
      triggerInsights,
      customerAccountInsights,
      ruleInsights,
      customerAssetBalance,
      customerPurchasePredictions,
      campaignOverview,
      campaignHighlights,
      userLoyaltyScores,
    }
  }
}
