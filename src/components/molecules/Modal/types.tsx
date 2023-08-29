export interface ModalProps {
  children: React.ReactNode
  isShown: boolean
  className?: string
  hide: () => void
  height?: string
  headerClass?: string
  header: string
}
