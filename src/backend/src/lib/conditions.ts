import { ICondition } from '@campaignAPIModels/Rule'
import { ITrigger } from '@campaignAPIModels/Trigger'

export const checkCondition = (condition: ICondition, payload: ITrigger['payload']): boolean => {
  const { key, operator, value } = condition
  const payloadValue = payload[key]
  if (!payloadValue) {
    return false
  }
  switch (operator) {
    case 'eq':
      return payloadValue === value
    case 'neq':
      return payloadValue !== value
    case 'gt':
      return Number(payloadValue) > Number(value)
    case 'gte':
      return Number(payloadValue) >= Number(value)
    case 'lt':
      return Number(payloadValue) < Number(value)
    case 'lte':
      return Number(payloadValue) <= Number(value)
    case 'in':
      return value.split(',').includes(payloadValue)
    case 'nin':
      return !value.split(',').includes(payloadValue)
    default:
      return false
  }
}
