import React from "react";
import Navbar from "@/components/molecules/Navbar";
import Sidebar from "@/components/molecules/Sidebar";

type LayoutProps = {
  children: React.ReactNode;
};
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <div className="h-screen flex gap-5 pr-3">
        <Sidebar />
        <div className="overflow-auto w-full pt-20">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
