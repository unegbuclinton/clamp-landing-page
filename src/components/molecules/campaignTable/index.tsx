import { campaigns } from "@/utilities/data/campaignJson";
import { AiOutlineMore, AiOutlineRight } from "react-icons/ai";

const CampaignTable = () => {
  return (
    <div className="flex rounded-xl border border-light-grey flex-col w-[85%] mb-5">
      <div className="flex justify-between border-light-grey  border-b font-bold">
        <div className=" p-4">CAMPAIGN NAMES</div>
        <div className=" p-4">OPTED IN</div>
        <div className=" p-4">ALLOCATED POINTS</div>
        <div className=" p-4">STATUS</div>
        <div className=" p-4"></div>
      </div>
      {campaigns?.map(
        ({ title, opt, value, customers, points, status }, index) => (
          <div
            key={index}
            className="flex justify-between bg-white border-b border-light-grey"
          >
            <div className=" p-4 w-fit">{title}</div>
            <div className=" p-4">
              <p>{opt}</p>
              <p className="text-sm text-battle-grey/60">{`${customers}% of customers`}</p>
            </div>
            <div className=" p-4">
              <p> {points}</p>
              <p className="text-sm text-battle-grey/60">{value}</p>
            </div>
            <div className=" p-4">{status ? "Active" : "PAUSED"}</div>
            <div className=" p-4">
              <AiOutlineMore />
            </div>
          </div>
        )
      )}
      <div className="flex items-center w-full justify-center py-3">
        <p className="text-center font-semibold text-base">See all campaigns</p>
        <AiOutlineRight size={10} />
      </div>
    </div>
  );
};

export default CampaignTable;
