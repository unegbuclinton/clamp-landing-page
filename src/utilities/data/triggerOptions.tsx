export const triggerOptions: Array<{
  value: string
  label: string
  operator: string
}> = [
  {
    value: 'Price',
    label: 'Transaction is greater than or equal to a particular amount',
    operator: 'gte',
  },
  {
    value: 'Money Deposit',
    label:
      'Frequency of transaction is equal to or gretaer than a particular number of time',
    operator: 'gte',
  },
  {
    value: 'Benin',
    label: 'Transaction in a specific location',
    operator: 'eq',
  },
  {
    value: 'Bet',
    label: 'Bet amount greater than value',
    operator: 'gt',
  },
]
