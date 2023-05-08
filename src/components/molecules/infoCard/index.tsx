import { Card } from "antd";
import React from "react";
import { infoCardProps } from "./types";

const infoCard: React.FC<infoCardProps> = ({
  children,
  label,
  subText,
  description,
}) => {
  return (
    <div className="mb-8">
      <p className="text-xs text-dim-grey pb-4">{label}</p>
      <Card className="w-full max-w-[462px] lg:w-[462px] bg-seasalt mb-4">
        <p className="font-bold text-sm">{description}</p>
        <p className="text-battle-grey">{subText}</p>
        {children}
      </Card>
    </div>
  );
};

export default infoCard;
