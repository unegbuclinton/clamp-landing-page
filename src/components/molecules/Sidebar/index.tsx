import React from "react";
import Button from "@/components/atoms/button";
import SideBarItems from "./SideBarItems";

const Sidebar = () => {
  return (
    <div className="relative h-full mt-[4rem] shadow-xl bg-white">
      <div className=" max-w-2xl mx-auto hidden lg:block">
        <aside className="w-64" aria-label="Sidebar">
          <div className=" h-screen px-3 py-4 overflow-y-auto rounded dark:bg-gray-800">
            <SideBarItems />
            <Button text="Create Campaign" className="mt-10" />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
