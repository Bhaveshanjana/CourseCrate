import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { RiMenu2Fill } from "react-icons/ri";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Menu from "./Menu";

const BuyCourse = () => {
  const { courseId } = useParams();
  const [open, setOpen] = useState(false);
  const [course, setCourse] = useState({});
  const navigate = useNavigate();

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
      navigate("/Purchased");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.errors ||
        "Somthing Went Wrong. Please try again";
      toast.error(message);
    }
  };

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

        <div className="px-4">
          <div className="bg-gray-400 max-w-md md:max-w-xl mx-auto p-4 mt-9 rounded-md text-base md:text-2xl flex flex-col items-center">
            <p className="mb-2 text-center">
              Course Name:{" "}
              <span className="text-white ">{course.courses?.title}</span>
            </p>
            <p className="mb-4 text-center">
              Course Price:{" "}
              <span className="text-white ">{course.courses?.price} $</span>
            </p>
            <button
              onClick={handelBuyCourses}
              className="bg-[#08242781] rounded-md text-sm md:text-base px-4 py-2 text-white cursor-pointer hover:translate-y-1 hover:bg-[#522c2cbb] transition duration-300"
            >
              Buy Now
            </button>
          </div>
        </div>
        <div>
          <p className="text-center text-lg text-white mt-4">Payment option cumming soon....</p>
        </div>
      </div>
    </>
  );
};
export default BuyCourse;
