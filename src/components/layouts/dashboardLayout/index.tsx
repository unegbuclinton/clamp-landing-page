import React from "react";
import Sidebar from "@/components/molecules/Sidebar";
import { dashboardLayoutProps } from "./types";
import Navbar from "@/components/molecules/Navbar";

const DashboardLayout: React.FC<dashboardLayoutProps> = ({ children }) => {
  return (
    <div className="">
      <Navbar />
      <div className=" flex gap-5 pr-3 ">
        <Sidebar />
        <div className="overflow-auto w-full h-[90vh] pb-11">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
