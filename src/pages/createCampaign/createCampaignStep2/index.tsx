// import DashboardLayout from "@/components/layouts/dashboardLayout";
// import InfoCard from "@/components/molecules/infoCard";
// import React from "react";

// const CreateCampaignTwo = () => {
//   return (
//     <DashboardLayout>
//       <div className="flex justify-center w-full">
//         <div>
//           <h1 className="text-2xl font-semibold mb-16">
//             Create Rewards Campaign
//           </h1>
//           <p className="text-xs text-dim-grey mb-4">Step 1 of 2</p>
//           <h1 className="text-lg font-semibold mb-5">Set trigger & reward</h1>
//           <InfoCard label="TRIGGER" description="Every time customer spends" />
//           <InfoCard label="EFFECT" description="Customer earns" />
//           <InfoCard
//             label="REDEMPTION"
//             description="Points needed to redeemed reward"
//           />
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default CreateCampaignTwo;
import PillButton from "@/components/atoms/pillButton";
import DashboardLayout from "@/components/layouts/dashboardLayout";
import InfoCard from "@/components/molecules/infoCard";
import { Button, Card } from "antd";
import React from "react";
import { BsPercent } from "react-icons/bs";
import { IoIosCheckmarkCircle } from "react-icons/io";

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
          <InfoCard label="EFFECT" description="Customer earns">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit ipsam!.
            Recusandae,
          </InfoCard>
          <InfoCard
            label="REDEMPTION"
            description="Points needed to redeemed reward"
          >
            <div className="flex gap-3">
              <PillButton
                text="Cashback"
                icon={<IoIosCheckmarkCircle size={15} />}
              />
              <PillButton
                outline
                text="Discount"
                icon={<BsPercent size={15} />}
              />
              <PillButton outline text="Perk" />
            </div>
          </InfoCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateCampaignTwo;
