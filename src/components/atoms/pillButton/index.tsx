import { Button } from "antd";
import React from "react";
import { pillButtonProp } from "./types";

const PillButton: React.FC<pillButtonProp> = ({
  icon,
  onClick,
  outline,
  text,
}) => {
  // Variants
  const outlineVariant = "bg-white text-black ";
  return (
    <Button
      className={`${
        outline ? outlineVariant : "bg-black  text-white"
      } flex items-center hover:bg-black/30 gap-[11px] py-2 px-3`}
      type="primary"
      icon={icon}
      onClick={onClick}
      shape="round"
    >
      {text}
    </Button>
  );
};

export default PillButton;