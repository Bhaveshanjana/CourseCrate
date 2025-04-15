import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { RiMenu2Fill } from "react-icons/ri";
import Menu from "./Menu";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "motion/react";

const Courses = () => {
  const [open, setOpen] = useState(false);
  const [course, setCourse] = useState([]);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  // getting all courses
  useEffect(() => {
    const courses = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/course/getAllCourses`
        );

        setCourse(res.data.courses);
      } catch (error) {
        const message =
          error.response?.data?.message ||
          error.response?.data?.errors?.[0]?.msg ||
          "Something went wrong. Please try again.";
        toast.error(message);
      }
    };
    courses();
  });

  // log out function
  const handleLogOut = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/logout`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(`${response.data.message}`);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.msg ||
        "Something went wrong. Please try again.";

      toast.error(message);
    }
    localStorage.removeItem("token");
    navigate("/log-in");
  };

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
          <div className="relative mx-2">
            <FaUser
              onClick={() => {
                setShowDropdown(!showDropdown);
              }}
              className="text-white text-xl cursor-pointer hover:text-blue-300 md:text-2xl"
            />

            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -right-4 mt-4 bg-[#1b6165eb] rounded-md shadow-md w-28 text-sm space-y-2 "
              >
                <button
                  className="w-full text-left my-2 px-4 hover:text-white cursor-pointer transition-all duration-200"
                  onClick={() => navigate("/update-user")}
                >
                  Update User
                </button>
                <button
                  className="w-full text-left px-4 mb-2 hover:text-white cursor-pointer transition-all duration-200"
                  onClick={handleLogOut}
                >
                  Logout
                </button>
              </motion.div>
            )}
          </div>
          <div
            onClick={() => {
              setOpen(!open);
            }}
          >
            <RiMenu2Fill className="text-xl hover:text-blue-300 text-white cursor-pointer md:text-2xl" />
          </div>
        </div>
      </div>
      {/* Hamburger */}
      <Menu open={open} />

      {/* Course data */}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 p-4 ">
        {course.map((course) => (
          <div key={course._id} className="max-w-lg mx-auto p-4">
            <div className="bg-gray-500 rounded-md overflow-hidden ">
              <img
                src={course.image.url}
                alt=""
                className="w-full h-full object-contain "
              />
              <div className="mx-2">
                <h1 className=" lg:text-lg text-sm capitalize text-gray-200">
                  <span className="font-semibold text-white underline">
                    Course:
                  </span>{" "}
                  {course.title}
                </h1>
                <p className="text-white line-clamp-2 text-xs capitalize md:text-[15px]">
                  <span className="font-semibold text-white underline lg:text-lg">
                    Description:
                  </span>{" "}
                  {course.description}
                </p>
              </div>
              <div className="flex justify-between mx-2 text-sm my-0.5 lg:text-lg">
                <p className="font-bold">
                  {" "}
                  ₹ 200{" "}
                  <span className="line-through text-red-300/90 ">500</span>
                </p>
                <p className="text-green-400">20% off</p>
              </div>
              <div className="mb-2 hover:transition-all hover:translate-y-0.5 inline-block">
                <Link
                  to={`/buy/${course._id}`} //pass course id in url so req.params get it
                  className="bg-red-400/80 rounded-md text-xs mx-2  p-0.5 text-white px-2 cursor-pointer lg:text-[18px] hover:bg-[#522c2c67] "
                >
                  Buy now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
