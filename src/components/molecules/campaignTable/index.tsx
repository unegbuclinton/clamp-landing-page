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
      {campaigns?.map(({ id, name, rules, status }) => (
        <div
          key={id}
          className="flex justify-between bg-white border-b border-light-grey"
        >
          <div className="p-4 w-fit">{name}</div>
          <div className=" p-4">
            <p>{rules[0].asset.pointValue}</p>
            <p className="text-sm text-battle-grey/60">{`4% of customers`}</p>
          </div>
          <div className=" p-4">
            <p> {rules[0].asset.pointValue}</p>
            <p className="text-sm text-battle-grey/60">
              {rules[0].asset.monetaryValue}
            </p>
          </div>
          <div className="p-4">{status ? "Active" : "PAUSED"}</div>
          <div className=" p-4">
            <AiOutlineMore className="cursor-pointer" />
          </div>
        </div>
      ))}
      <div className="flex items-center w-full justify-center py-3">
        <p className="text-center font-semibold text-base">See all campaigns</p>
        <AiOutlineRight size={10} />
      </div>
    </div>
  );
};

export default CampaignTable;
