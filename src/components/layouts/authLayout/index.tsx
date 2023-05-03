import React from "react";
import { authLayoutProps } from "./types";

const AuthLayout: React.FC<authLayoutProps> = ({ children }) => {
  return (
    <div className="py-4 px-8 text-sm">
      <header className="font-medium">Clamp</header>
      <div className="h-screen overflow-auto flex flex-col gap-5 justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
