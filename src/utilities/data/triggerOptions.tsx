export const triggerOptions: Array<{
  value: string
  label: string
  operator: string
}> = [
  {
    value: 'Price',
    label: 'Transaction is greater than or equal to value',
    operator: 'gte',
  },
  {
    value: 'Frequency',
    label: 'Transaction frequency is up to value',
    operator: 'gte',
  },
  {
    value: 'Location',
    label: 'Make transaction in a specific location',
    operator: 'eq',
  },
]

export const earningTypeOptions: Array<{
  value: string
  label: string
}> = [
  {
    value: 'Flat',
    label: 'Flat',
  },
  {
    value: 'recuring',
    label: 'Recurring',
  },
]
