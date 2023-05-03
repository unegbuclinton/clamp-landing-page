export interface ButtonProps {
  disabled?: boolean;
  className?: string;
  light?: boolean;
  text: string;
  type?: string;
  onClick?: () => void;
}
