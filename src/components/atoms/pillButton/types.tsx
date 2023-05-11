import { ReactNode } from "react";

export interface pillButtonProp {
  icon?: ReactNode;
  outline?: boolean;
  onClick?: () => void;
  text: string;
}
