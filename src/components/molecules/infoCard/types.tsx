import { ReactNode } from 'react'

export interface infoCardProps {
  label?: string
  description?: string | number
  outline?: boolean
  children?: ReactNode
  subText?: string | number
}
