import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Purchase = () => {
  const [purchased, setPurchased] = useState([]);
  const navigate = useNavigate();

  // Api call for user purchased courses
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
      {/* Navbar */}
      <Navbar />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 p-4 ">
        {purchased.length > 0 ? (
          purchased.map((course) => (
            <div key={course._id} className="max-w-lg mx-auto p-4">
              <div className="bg-gray-500 rounded-md overflow-hidden">
                <img
                  src={course.image.url}
                  alt=""
                  className="w-full h-full object-contain "
                />
                <div className="mx-2 mb-2">
                  <h1 className=" text-md font-semibold md:text-lg capitalize">
                    {course.title}
                  </h1>
                  <p className="text-white line-clamp-2 text-xs capitalize md:text-[15px]">
                    {course.description}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-gray-500 rounded-md mx-5 mt-6 max-w-3xl md:mx-auto text-white col-span-full">
            <p className="text-center p-4 text-sm md:text-xl">
              No courses found
              <span
                onClick={() => {
                  navigate("/courses");
                }}
                className="cursor-pointer mx-2 underline text-blue-400/90 relative inline-block duration-200 hover:-translate-y-0.5 hover:text-blue-300 "
              >
                Click here to purchase
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Purchase;
