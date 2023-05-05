import React from "react";
import SideBarItems from "./SideBarItems";
import ButtonComponent from "@/components/atoms/button";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  return (
    <div className="relative h-full mt-[4rem] shadow-xl bg-white">
      <div className=" max-w-2xl mx-auto hidden lg:block">
        <aside className="w-64" aria-label="Sidebar">
          <div className=" h-screen px-3 py-4 overflow-y-auto rounded dark:bg-gray-800">
            <SideBarItems />
            <ButtonComponent
              type="button"
              text="Create Campaign"
              className="mt-10"
              onClick={() => router.push("/createCampaign")}
            />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
