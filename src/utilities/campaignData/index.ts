export function generateConditionText(
  operator: string,
  conditionValue: string,
  key: string
) {
  switch (operator) {
    case 'gt':
      if (key === 'Frequency') {
        return {
          header: `Transaction Frequency greater than  ${conditionValue}`,
          description: `Customer earns points if transaction greater than ${conditionValue}`,
        }
      } else {
        return {
          header: `Transaction less greater ${conditionValue}`,
          description: `Customer earns points if transaction greater than ${conditionValue}`,
        }
      }
    case 'gte':
      if (key === 'Frequency') {
        return {
          header: `Transaction frequency greater than or equals ${conditionValue}`,
          description: `Customer earns points if transaction frequency greater than or equals ${conditionValue}`,
        }
      } else {
        return {
          header: `Transaction greater than or equals ${conditionValue}`,
          description: `Customer earns points if transaction greater than or equals ${conditionValue}`,
        }
      }
    case 'lt':
      if (key === 'Frequency') {
        return {
          header: `Transaction frequency less than ${conditionValue}`,
          description: `Customer earns points if transaction frequency less than ${conditionValue}`,
        }
      } else {
        return {
          header: `Transaction less than or equals ${conditionValue}`,
          description: `Customer earns points if transaction less than or equals ${conditionValue}`,
        }
      }
    case 'eq':
      if (key === 'Location') {
        return {
          header: `Location is at ${conditionValue}`,
          description: `Customer earns points if location is at ${conditionValue}`,
        }
      } else if (key === 'Frequency') {
        return {
          header: `Transaction frequency equals ${conditionValue}`,
          description: `Customer earns points if transaction frequency equals ${conditionValue}`,
        }
      } else {
        return {
          header: `Transaction equals ${conditionValue}`,
          description: `Customer earns points if transaction equals ${conditionValue}`,
        }
      }
    case 'lte':
      if (key === 'Frequency') {
        return {
          header: `Transaction Frequency less than or equals ${conditionValue}`,
          description: `Customer earns points if transaction frequency less than or equals ${conditionValue}`,
        }
      } else {
        return {
          header: `Transaction less than or equals ${conditionValue}`,
          description: `Customer earns points if transaction less than or equals ${conditionValue}`,
        }
      }

    default:
      return {
        header: '',
        description: '',
      }
  }
}

export function generateRedemptionConditionText(
  operator: string,
  redemptionValue: string
) {
  switch (operator) {
    case 'gte':
      return `Customer redeems points if greater than or equals to ${redemptionValue}`
    case 'gt':
      return `Customer can redeem points if greater than ${redemptionValue}`
    case 'lt':
      return `Customer earns points if less than ${redemptionValue}`
    case 'lte':
      return `Customer earns points if less than or equals to ${redemptionValue}`
    case 'eq':
      return `Customer earns points if equals to ${redemptionValue}`
    default:
      return ''
  }
}

export const data = [
  {
    header: 'Sales attributed',
    value: 'N0.00',
    //   subText: '24 new customers in the last 7 days',
  },
  {
    header: 'Customer opted in',
    value: '0',
    subText: '0% of customers',
  },
  {
    header: 'Points allocated',
    value: '0',
    subText: '0.00 in value',
  },
  {
    header: 'Claimed points',
    value: '0',
    subText: 'Claimed by 0 customers',
  },
]
