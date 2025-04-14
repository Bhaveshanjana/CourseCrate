import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { RiMenu2Fill } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Menu from "./Menu";
import { IoSearchOutline } from "react-icons/io5";

const BuyCourse = () => {
  const { courseId } = useParams();
  const [open, setOpen] = useState(false);
  const [course, setCourse] = useState({});

  useEffect(() => {
    const courseByData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/course/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCourse(res.data);
        // console.log(res.data);
      } catch (error) {
        const message =
          error.response?.data?.message ||
          error.response?.data?.errors ||
          "Somthing Went Wrong. Please try again";
        toast.error(message);
      }
    };
    courseByData();
  }, []);

  const handelBuyCourses = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/course/buy/${courseId}`,
        {}, //when nothing send from clint {} is mandatory
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(`${res.data.message}`);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.errors ||
        "Somthing Went Wrong. Please try again";
      toast.error(message);
    }
  };
  // handelBuyCourses();

  return (
    <>
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

        <div className="bg-gray-400 w-3xl mx-auto">
          <img src={course.courses?.image?.url} alt="" className=" " />
        </div>
      </div>
    </>
  );
};
export default BuyCourse;
