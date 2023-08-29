export interface ButtonProps {
  disabled?: boolean
  className?: string
  outline?: boolean
  type: 'submit' | 'reset' | 'button' | undefined
  text: string
  loading?: boolean
  height?: string
  onClick?: () => void
}
