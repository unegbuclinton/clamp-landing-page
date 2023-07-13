export const triggerOptions: Array<{
  value: string
  label: string
  operator: string
}> = [
  {
    value: 'Transaction is greater than or equal to a particular amount',
    label: 'Transaction is greater than or equal to a particular amount',
    operator: 'gte',
  },
  {
    value:
      'Frequency of transaction is equal to or gretaer than a particular number of time',
    label:
      'Frequency of transaction is equal to or gretaer than a particular number of time',
    operator: 'gte',
  },
  {
    value: 'Transaction in a specific location',
    label: 'Transaction in a specific location',
    operator: 'eq',
  },
  {
    value: 'Bet Price',
    label: 'Bet price greater than value',
    operator: 'gt',
  },
]
