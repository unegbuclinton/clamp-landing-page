import React from "react";
import { menu } from "@/utilities/data/sidebarItems";
import Link from "next/link";
import Button from "@/components/atoms/button";

const Sidebar = () => {
  return (
    <div className="relative">
      <div className=" max-w-2xl mx-auto hidden lg:block">
        <aside className="w-64" aria-label="Sidebar">
          <div className=" h-screen px-3 py-4 overflow-y-auto rounded bg-gray-50 dark:bg-gray-800">
            {/* <p className="py-2 px-2 font-semibold">Menus</p> */}
            <p className="py-2 px-2 font-semibold"> Clamp</p>

            <ul className="space-y-2">
              {menu?.map(({ title, to }, index) => {
                return (
                  <li key={index}>
                    <Link
                      href={to}
                      className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {/* <svg
                        className="flex-shrink-0 w-6 h-6 text-secondary transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                      </svg> */}
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        {title}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Button text="Create Campaign" className="mt-10" />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
