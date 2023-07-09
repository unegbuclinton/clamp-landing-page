import DashboardLayout from "@/components/layouts/dashboardLayout";
import ActivityInfo from "@/components/molecules/ActivityInfo";
import CampaignTable from "@/components/molecules/campaignTable";
import InfoCard from "@/components/molecules/infoCard";
import { activities } from "@/utilities/data/activitiesJson";
import { AiOutlineRight } from "react-icons/ai";

const Overview = () => {
  return (
    <DashboardLayout>
      <h1>Overview Page</h1>
      <div className="flex gap-4">
        <InfoCard outline>
          <div className="pr-20">
            <h1 className="mb-6 text-sm font-medium">Active campaigns</h1>
            <p className="text-2xl font-medium">4</p>
          </div>
        </InfoCard>
        <InfoCard outline>
          <div className="pr-14">
            <h1 className="mb-6 text-sm font-medium">
              Total customers opted in
            </h1>
            <p className="text-2xl font-medium">
              2,405 <sup className="battle-grey text-[10px] p-0">12%</sup>
            </p>
          </div>
        </InfoCard>
      </div>
      <CampaignTable />
      <div>
        <h2 className="mb-4 text-xl font-semibold">Activities</h2>
        <div className="rounded border border-light-grey p-6 w-[85%]">
          {activities?.map(({ badge, timestamp, title }, index) => (
            <ActivityInfo
              key={index}
              title={title}
              badge={badge}
              time={timestamp}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Overview;
