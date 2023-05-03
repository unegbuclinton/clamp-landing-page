import DashboardLayout from "@/components/layouts/dashboardLayout";
import { Card } from "antd";
import React from "react";

const CreateCampaign = () => {
  return (
    <DashboardLayout>
      <div className="w-full">
        <h1 className="text-2xl font-semibold">Create Rewards Campaign</h1>
        <Card className="bg-seasalt max-w-[462px]">
          <p className="text-sm font-medium mb-2">Campaign name</p>
          <p className="text-battle-grey">E.g. Summer loyalty program</p>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CreateCampaign;
