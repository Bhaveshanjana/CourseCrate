import React, { useEffect, useState } from "react";
import axios from "axios";
import Menu from "./Menu";
import { RiMenu2Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Purchase = () => {
  const [purchased, setPurchased] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const response = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/purchased`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPurchased(res.data.courseData);
      } catch (error) {
        console.log(error);
      }
    };
    response();
  }, []);
  return (
    <div className="bg-blue-950/30 min-h-screen overflow-y-auto max-h-[80vh] custom-scrollbar">
      <div>
        {/* Navbar */}
        <div className="bg-gray-700 flex justify-between items-center p-2 px-4 custom-scrollbar">
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

      <div className="grid sm:grid-cols-2 md:grid-cols-3 p-4 ">
        {purchased.map((course) => (
          <div key={course._id} className="max-w-lg mx-auto p-4">
            <div className="bg-gray-500 rounded-md overflow-hidden">
              <img
                src={course.image.url}
                alt=""
                className="w-full h-full object-contain "
              />
              <div className="mx-2">
                <h1 className=" text-md font-semibold md:text-lg capitalize">
                  {course.title}
                </h1>
                <p className="text-white line-clamp-2 text-xs capitalize md:text-[15px]">
                  {course.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Purchase;
