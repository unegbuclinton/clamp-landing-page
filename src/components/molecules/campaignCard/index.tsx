import { Card } from "antd";
import React from "react";
import { campaigncardProps } from "./types";

const CampaignCard: React.FC<campaigncardProps> = ({
  children,
  label,
  description,
}) => {
  return (
    <div className="mb-8">
      <p className="text-xs text-dim-grey pb-4">{label}</p>
      <Card className="max-w-[462px] bg-seasalt mb-4">
        <p className="font-bold text-sm">{description}</p>
      </Card>
      {children}
    </div>
  );
};

export default CampaignCard;
