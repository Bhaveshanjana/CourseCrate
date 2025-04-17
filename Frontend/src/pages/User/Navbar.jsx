import React, { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { RiMenu2Fill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

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
    <>
      <div className="bg-gray-700 flex justify-between items-center p-2 px-4 custom-scrollbar">
        {/* Logo / Title */}
        <h2 className="text-gray-300 text-lg font-semibold tracking-wider">
          CourseCrate
        </h2>
        {/* User icon */}
        <div className="ml-4 flex gap-2 ">
          <div className="relative">
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
                className="absolute -right-4 mt-4 bg-[#5f5959ee] rounded-md shadow-md w-28 text-sm space-y-2 "
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

      {/* Menu  */}

      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="absolute right-2 z-20 top-14 "
          >
            <div className="text-gray-200  bg-cyan-500/60 max-w-sm h-auto mx-auto rounded-xl">
              <div className="flex justify-center flex-col  gap-4 p-2 text-lg ">
                <Link
                  to={"/courses"}
                  className="hover:text-blue-500 transition-all duration-200"
                >
                  Home
                </Link>
                {location.pathname !== "/Purchased" && (
                  <Link
                    to={"/Purchased"}
                    className="hover:text-blue-500 transition-all duration-200"
                  >
                    Purchased
                  </Link>
                )}
                {location.pathname !== "/courses" && (
                  <Link
                    to={"/courses"}
                    className="hover:text-blue-500 transition-all duration-200"
                  >
                    Courses
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
