import { ReactNode } from 'react'

export interface pillButtonProp {
  icon?: ReactNode
  outline?: boolean
  onClick?: () => void
  disabled?: boolean
  text: string
}
