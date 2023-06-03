import React from "react";
import InfoCard from "@/components/molecules/infoCard";
const CreateCampaignSummary = () => {
  return (
    <div>
      <p className="text-xs text-dim-grey mb-4">Step 2 of 2</p>
      <h1 className="font-semibold text-xl">Summary</h1>

      <InfoCard
        outline
        description="Campaign name"
        subText="Summer loyalty programme"
      />
      <InfoCard outline description="Every time customer spends" subText="$1">
        <div className="py-4">
          <p className="text-dim">Customer earns</p>
          <p className="font-medium">1 point</p>
        </div>
      </InfoCard>
      <InfoCard outline description="Every time customer spends" subText="$1">
        <div className="py-4">
          <p className="text-dim">Points needed to redeemed reward</p>
          <p className="font-medium">35</p>
        </div>
      </InfoCard>
      <InfoCard
        outline
        subText="Points needed to redeemed reward"
        description="35"
      >
        <div className="py-4">
          <p className="text-dim">Reward</p>
          <p className="font-medium">Cashback</p>
        </div>
        <div className="py-4">
          <p className="text-dim">Cashback amount</p>
          <p className="font-medium">$5</p>
        </div>
      </InfoCard>
    </div>
  );
};

export default CreateCampaignSummary;
