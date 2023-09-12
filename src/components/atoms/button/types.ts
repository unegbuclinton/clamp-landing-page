import { ReactNode } from 'react'
export interface ButtonProps {
  disabled?: boolean
  className?: string
  outline?: boolean
  type: 'submit' | 'reset' | 'button' | undefined
  text: ReactNode
  loading?: boolean
  height?: string
  onClick?: () => void
}
