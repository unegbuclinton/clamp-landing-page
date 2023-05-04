import DashboardLayout from "@/components/layouts/dashboardLayout";
import CampaignCard from "@/components/molecules/campaignCard";
import { Card } from "antd";
import React from "react";

const CreateCampaign = () => {
  return (
    <DashboardLayout>
      <div className="flex w-full justify-center">
        <div>
          <h1 className="text-2xl font-semibold">Create Rewards Campaign</h1>
          <CampaignCard
            description="Campaign name"
            subText="E.g. Summer loyalty program"
          />
          <>
            {/* <p className="text-sm font-medium mb-2"></p> */}
            {/* <p className=""></p> */}
          </>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateCampaign;
