import { Card } from "antd";
import React from "react";
import { infoCardProps } from "./types";

const InfoCard: React.FC<infoCardProps> = ({
  children,
  label,
  subText,
  description,
  outline,
}) => {
  return (
    <div className="mb-8">
      <p className="text-xs text-dim-grey pb-4">{label}</p>
      <Card
        className={`w-full max-w-[462px] lg:w-[462px] ${
          outline ? "bg-white" : "bg-seasalt"
        }  mb-4`}
      >
        <p className="font-bold text-sm">{description}</p>
        <p className="text-battle-grey pb-2">{subText}</p>
        {children}
      </Card>
    </div>
  );
};

export default InfoCard;
