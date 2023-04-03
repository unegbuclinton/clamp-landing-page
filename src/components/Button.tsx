import React from "react";

type ButtonProps = {
  disabled?: boolean;
  className?: string;
  light?: boolean;
  text: string;
  pill?: string;
  type?: string;
  alias?: string;
  loading?: string;
};

const Button: React.FC<ButtonProps> = ({
  light,
  text,
  disabled,
  className,
}) => {
  return (
    <button
      disabled={disabled}
      className={`${
        light ? "bg-white text-black" : "bg-black text-white"
      } text-sm py-3 px-7 rounded-[9px] hover:scale-90 duration-200 ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
