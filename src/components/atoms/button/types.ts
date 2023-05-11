export interface ButtonProps {
  disabled?: boolean;
  className?: string;
  outline?: boolean;
  type: "submit" | "reset" | "button" | undefined;
  text: string;
  height?: string;
  onClick?: () => void;
}
