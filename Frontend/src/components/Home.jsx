import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";

const home = () => {
  const [courses, setCourses] = useState([]);
  const [isloggedIn, setIsloggedIn] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // function for checking use logged in or not
  useEffect(() => {
    if (token) {
      setIsloggedIn(true);
    } else {
      setIsloggedIn(false);
    }
  }, []);

  //function for getting all course
  useEffect(() => {
    const course = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/course/getAllCourses`
        );
        setCourses(response.data.courses);
      } catch (error) {
        console.log("error in fetching courses-", error);
      }
    };
    course();
  }, []);

  // log out function
  const handleLogOut = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/logout`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsloggedIn(false);
    } catch (error) {
      toast.error(error.response.data.errors[0].msg);
    }
    localStorage.removeItem("token");
    navigate("/log-in");
  };

  //settings for slids
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    repeat: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="bg-gradient-to-r from-gray-900  min-h-screen">
        {/* Navbar */}

        <div className="flex justify-between pt-6 mx-6">
          <Link to={"/"} className="text-orange-400 text-[18px] lg:text-2xl">
            CourseCrate
          </Link>

          {/* Check use loged in or not and render log out button */}

          {isloggedIn ? (
            <button
              onClick={handleLogOut}
              className="text-sm bg-blue-400/50 rounded-md p-1 px-2 lg:text-lg lg:px-2 cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <>
              <div className="space-x-2 ">
                <Link
                  to={"/log-in"}
                  className="text-sm bg-green-500 rounded-md px-2 p-1  lg:text-lg lg:px-3"
                >
                  Login
                </Link>
                <Link
                  to={"/sign-up"}
                  className="text-sm bg-blue-400/50 rounded-md p-1 px-2 lg:text-lg lg:px-2"
                >
                  Signup
                </Link>
              </div>
            </>
          )}
        </div>

        {/* main section 1*/}

        <div className="flex justify-center flex-col items-center space-y-4 mt-32 ">
          <h1 className="text-xl text-orange-400 font-medium lg:text-3xl">
            CourseCrate
          </h1>
          <p className="text-gray-400 text-sm lg:text-xl">
            Enhance your skill with courses made by experts.
          </p>
          <div className="space-x-3 mt-2">
            <Link className="bg-white rounded-md px-2 p-2 text-black text-[15px ">
              Explore courses
            </Link>
            <Link className="bg-green-500 rounded-md px-2 p-2 text-[15px]">
              Course video
            </Link>
          </div>
        </div>

        {/* Slider Section- */}

        <section className="p-8">
          <Slider {...settings} className="">
            {courses.map((courses) => (
              <div key={courses._id} className="">
                <div className="lg:w-60 relative transition-transform transform duration-300 hover:scale-105 xl:w-80 lg:px-4 md:w-55 sm:w-80  mt-9 ">
                  <div className=" bg-gray-700 rounded-lg overflow-hidden ">
                    <img
                      src={courses.image.url}
                      alt=""
                      className="w-full object-contain"
                    />
                    <div className="p-1 text-center">
                      <h2 className="text-[18px] text-white">
                        {courses.title}
                      </h2>
                      <button className="px-3 bg-green-900/60 rounded-md my-2 hover:bg-blue-900/50 hover:text-white transition-all duration-200 cursor-pointer">
                        Enroll now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        {/* Footer Section-- */}

        <div className="mt-14 text-white">
          <footer className="w-[70%] mx-auto ">
            <h1 className="text-center py-1 text-[16px] border-t-2 lg:py-2 lg:text-lg">
              Design and developed by bhavesh
            </h1>
          </footer>
        </div>
      </div>
    </>
  );
};

export default home;
