import React from "react";
import Navbar from "@/components/molecules/Navbar/index.tsx";
import Sidebar from "@/components/molecules/Sidebar";
import { dashboardLayoutProps } from "./types";

const DashboardLayout: React.FC<dashboardLayoutProps> = ({ children }) => {
  return (
    <div className="">
      <Navbar />
      <div className=" flex gap-5 pr-3 ">
        <Sidebar />
        <div className="overflow-auto w-full pt-5">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
