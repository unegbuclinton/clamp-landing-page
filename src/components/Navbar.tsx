import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { BiDownArrow } from "react-icons/bi";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { menu } from "@/utilities/sidebarItems";
import Link from "next/link";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen(!open);
  };
  const closeMenu = () => setOpen(false);
  return (
    <div className="fixed top-0 bg-gray-50 w-full py-4">
      <nav className=" border-gray-200 px-2 ">
        <div className="flex flex-wrap items-center justify-between">
          <a href="#" className="flex">
            <svg
              className="h-10 mr-3"
              width="51"
              height="70"
              viewBox="0 0 51 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0)">
                <path
                  d="M1 53H27.9022C40.6587 53 51 42.7025 51 30H24.0978C11.3412 30 1 40.2975 1 53Z"
                  fill="#76A9FA"
                ></path>
                <path
                  d="M-0.876544 32.1644L-0.876544 66.411C11.9849 66.411 22.4111 55.9847 22.4111 43.1233L22.4111 8.87674C10.1196 8.98051 0.518714 19.5571 -0.876544 32.1644Z"
                  fill="#A4CAFE"
                ></path>
                <path
                  d="M50 5H23.0978C10.3413 5 0 15.2975 0 28H26.9022C39.6588 28 50 17.7025 50 5Z"
                  fill="#1C64F2"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="51" height="70" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
            <span className="self-center text-lg font-bold whitespace-nowrap">
              Clamp
            </span>
          </a>
          <div className="flex md:order-2">
            <div className="flex gap-2 items-center cursor-pointer">
              <FaUserCircle size={28} />
              <BiDownArrow size={15} />
            </div>
            <div className="mt-1 lg:hidden ml-3" onClick={toggleMenu}>
              {open ? (
                <AiOutlineClose color="#000" size={20} />
              ) : (
                <AiOutlineMenu color="#000" size={20} />
              )}
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`${
          open
            ? "-translate-x-[70%] duration-200"
            : "-translate-x-[200%] duration-200"
        } flex fixed h-screen w-[60%] top-0 right-0 bg-black z-[10] lg:hidden `}
      >
        <div className="w-full flex flex-col justify-center items-center">
          {menu?.map(({ title, to }, idx) => {
            return (
              <Link
                key={idx}
                href={to}
                onClick={closeMenu}
                className="text-center mb-5"
              >
                <p className="text-white -text-sm">{`0${idx + 1}.`}</p>
                <p className="text-white">{title}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
