import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { RiMenu2Fill } from "react-icons/ri";
import Menu from "./Menu";

const Courses = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-blue-950/30 h-screen">
      <div>
        {/* Navbar */}
        <div className="bg-gray-700 flex justify-between items-center p-2 px-4">
          {/* Logo / Title */}
          <h2 className="text-gray-300 text-lg font-semibold tracking-wider">
            CourseCrate
          </h2>

          {/* Search bar */}
          <div className="flex-1 flex justify-center md:justify-end ml-4 ">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-3 pr-10 py-1.5 rounded-md border border-[#c8ced8] bg-transparent text-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <IoSearchOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-xl cursor-pointer hover:text-blue-300" />
            </div>
          </div>

          {/* User icon */}
          <div className="ml-4 flex gap-2 ">
            <Link to={"/update-user"}>
              <FaUser className="text-white text-xl cursor-pointer hover:text-blue-300 md:text-2xl" />
            </Link>
            <div
              onClick={() => {
                setOpen(!open);
              }}
            >
              <RiMenu2Fill className="text-xl hover:text-blue-300 text-white cursor-pointer md:text-2xl" />
            </div>
          </div>
        </div>
      </div>
      {/* Hamburger */}
      <Menu open={open} />
    </div>
  );
};

export default Courses;
