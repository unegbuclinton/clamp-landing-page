import { menu } from "@/utilities/data/sidebarItems";
import ClientOnly from "@/utilities/helperFunctions";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const SideBarItems = () => {
  const router = useRouter();
  return (
    <ClientOnly>
      <ul className="space-y-2">
        {menu?.map(({ title, to }, index) => {
          return (
            <li key={index}>
              <Link
                href={to}
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <a
                  className={
                    router.pathname == `${to}`
                      ? "flex-1 ml-3 whitespace-nowrap font-bold"
                      : "flex-1 ml-3 whitespace-nowrap"
                  }
                >
                  {title}
                </a>

                <span className=""></span>
              </Link>
            </li>
          );
        })}
      </ul>
    </ClientOnly>
  );
};

export default SideBarItems;
