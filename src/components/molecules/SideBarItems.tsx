import { menu } from "@/utilities/data/sidebarItems";
import Link from "next/link";
import React from "react";

const SideBarItems = () => {
  return (
    <ul className="space-y-2">
      {menu?.map(({ title, to }, index) => {
        return (
          <li key={index}>
            <Link
              href={to}
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="flex-1 ml-3 whitespace-nowrap">{title}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SideBarItems;
