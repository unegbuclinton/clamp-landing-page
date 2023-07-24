import DashboardLayout from "@/components/layouts/dashboardLayout";
import InfoCard from "@/components/molecules/infoCard";
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
          <InfoCard label="TRIGGER" description="Every time customer spends" />
          <InfoCard label="EFFECT" description="Customer earns" />
          <InfoCard
            label="REDEMPTION"
            description="Points needed to redeemed reward"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateCampaignTwo;
