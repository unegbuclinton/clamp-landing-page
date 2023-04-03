import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

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
