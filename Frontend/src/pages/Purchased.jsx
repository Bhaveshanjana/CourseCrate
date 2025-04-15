import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const Purchase = () => {
  const [purchased, setPurchased] = useState([]);

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
        {purchased.map((course) => (
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
        ))}
      </div>
    </div>
  );
};

export default Purchase;

{
  /* <div>
Navbar
<div className="bg-gray-700 flex justify-between items-center p-2 px-4 custom-scrollbar">
  Logo / Title
  <h2 className="text-gray-300 text-lg font-semibold tracking-wider">
    CourseCrate
  </h2>

  User icon 
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
<Menu open={open} />*/
}
