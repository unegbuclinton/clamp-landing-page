import { ReactNode } from "react";

export interface infoCardProps {
  label?: string;
  description?: string;
  outline?: boolean;
  children?: ReactNode;
  subText?: string;
}
