import PrupleBadge from "@/assets/svgs/purpleBadge.svg";
import GoldBadge from "@/assets/svgs/goldBadge.svg";
import { activityProp } from "./types";

const ActivityInfo: React.FC<activityProp> = ({ title, time, badge }) => {
  return (
    <div className="flex gap-2 mb-6">
      {badge === "tier-one" ? <GoldBadge /> : <PrupleBadge />}
      <div>
        <p>{title}</p>
        <span className="font-thin text-battle-grey text-sm">{time}</span>
      </div>
    </div>
  );
};

export default ActivityInfo;
