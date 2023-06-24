import ButtonComponent from "@/components/atoms/button";
import { useTheme } from "@/utilities/helperFunctions";
import React, { useEffect, useState } from "react";
import { CiDark } from "react-icons/ci";
import { MdLightMode } from "react-icons/md";

interface landingPageProps {
  buttonClick: () => void;
}

const LandingNavbar: React.FC<landingPageProps> = ({ buttonClick }) => {
  const [theme, setTheme] = useState(false);

  const [changeNavbarStyle, setChangeNavbarStyle] = useState<boolean>(false);
  const toggleTheme = () => setTheme((prev) => !prev);
  useTheme(theme);

  const changeNavbar = () => {
    if (window.scrollY >= 600) {
      setChangeNavbarStyle(true);
    } else {
      setChangeNavbarStyle(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavbar);
    return () => window.removeEventListener("scroll", changeNavbar);
  });
  return (
    <div className="fixed w-full flex justify-center bg-white/90 dark:bg-dark/90 z-10">
      <nav className=" w-full max-w-[75%] flex justify-between items-center py-5">
        <h1 className="text-lg font-semibold cursor-pointer">Clamployalty</h1>
        <div className="flex items-center">
          <div
            className={`${
              changeNavbarStyle ? "opacity-100" : "opacity-0"
            } duration-500`}
          >
            <ButtonComponent
              text="Get early access"
              type="button"
              onClick={buttonClick}
            />
          </div>
          <div
            onClick={toggleTheme}
            className="p-2 cursor-pointer w-fit rounded-md ml-5 hover:bg-light-grey/20 duration-200"
          >
            {!theme && <CiDark size={20} />}
            {theme && <MdLightMode size={20} />}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default LandingNavbar;
