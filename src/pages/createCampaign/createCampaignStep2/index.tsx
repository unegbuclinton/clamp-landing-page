import DashboardLayout from "@/components/layouts/dashboardLayout";
import CampaignCard from "@/components/molecules/campaignCard";
import CampaigCard from "@/components/molecules/campaignCard";
import { Card } from "antd";
import React from "react";

const CreateCampaignTwo = () => {
  return (
    <DashboardLayout>
      <div className="flex justify-center w-full">
        <div>
          <h1 className="text-2xl font-semibold mb-16">
            Create Rewards Campaign
          </h1>
          <p className="text-xs text-dim-grey mb-4">Step 1 of 2</p>
          <h1 className="text-lg font-semibold mb-5">Set trigger & reward</h1>
          <CampaignCard
            label="TRIGGER"
            description="Every time customer spends"
          />
          <CampaignCard label="EFFECT" description="Customer earns" />
          <CampaignCard
            label="REDEMPTION"
            description="Points needed to redeemed reward"
          ></CampaignCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateCampaignTwo;
