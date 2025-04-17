import axios from "axios";
import React, { useEffect, useState } from "react";
import { GoHome } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateCourse = () => {
  const [course, setCourse] = useState([]);
  const navigate = useNavigate();

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

  const handleDelete = async (courseId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/v1/course/delete/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Admin-token")}`,
          },
        }
      );
      toast.success("Course deleted successfully!");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.msg ||
        "Something went wrong. Please try again.";
      toast.error(message);
    }
  };
  return (
    <>
      <div>
        {/* Navbar */}
        <div className="bg-gray-700 flex justify-between items-center p-2 px-4 custom-scrollbar">
          {/* Logo / Title */}
          <h2 className="text-gray-300 text-lg font-semibold tracking-wider">
            CourseCrate
          </h2>
          <GoHome
            onClick={() => {
              navigate("/Admin-home");
            }}
            className="text-2xl cursor-pointer transition-all hover:text-blue-500 duration-200"
          />
        </div>
      </div>
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
                  ₹ {course.price}{" "}
                  <span className="line-through text-red-300/90 ">990</span>
                </p>
                <p className="text-green-400">20% off</p>
              </div>
              <div className="mb-2 flex justify-between ">
                <Link
                  to={`/Update-course/${course._id}`}
                  className="bg-red-400/80 rounded-md text-xs mx-2  p-0.5 text-white px-2 cursor-pointer lg:text-[18px] hover:bg-[#522c2c67] "
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(course._id)}
                  className="mr-3 bg-red-400/80 rounded-md text-xs mx-2  p-0.5 text-white px-2 cursor-pointer lg:text-[18px] hover:bg-[#522c2c67]"
                >
                  delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UpdateCourse;
