import { Rule, IRule } from '../models/Rule'
import { v4 as uuidv4 } from 'uuid'

const getAllRules = async (): Promise<IRule[]> => {
  return await Rule.find().exec()
}

const getRuleById = async (id: string): Promise<IRule | null> => {
  return await Rule.findOne({ id }).exec()
}

const createRule = async (ruleData: Partial<IRule>): Promise<IRule> => {
  ruleData.id = uuidv4()
  const newRule = new Rule(ruleData)
  return await newRule.save()
}

const updateRule = async (id: string, ruleData: Partial<IRule>): Promise<IRule | null> => {
  return await Rule.findOneAndUpdate({ id }, ruleData, { new: true }).exec()
}

export const RuleService = {
  getAllRules,
  getRuleById,
  createRule,
  updateRule,
}
