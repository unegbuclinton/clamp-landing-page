import React from "react";
import SideBarItems from "./SideBarItems";
import { useRouter } from "next/navigation";
import ButtonComponent from "@/components/atoms/button";

const Sidebar = () => {
  const router = useRouter();
  return (
    <div className="relative h-full shadow-xl bg-white">
      <div className=" max-w-2xl mx-auto hidden lg:block">
        <aside className="w-64" aria-label="Sidebar">
          <div className=" h-screen px-3 py-4">
            <SideBarItems />
            <ButtonComponent
              onClick={() => router.push("/createCampaign")}
              text="Create Campaign"
              type="button"
              className="mt-10"
            />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
