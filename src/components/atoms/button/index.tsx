import React from "react";
import { ButtonProps } from "./types";

const Button: React.FC<ButtonProps> = ({
  light,
  text,
  disabled,
  className,
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${
        light ? "bg-white text-black" : "bg-black text-white"
      } text-sm py-3 px-7 rounded-[9px] hover:scale-90 duration-200 ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
