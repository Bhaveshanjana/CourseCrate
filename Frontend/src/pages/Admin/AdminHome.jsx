import React, { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { RiMenu2Fill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "react-toastify";
import axios from "axios";
import { AdminDataContext } from "../../context/AdminContext";

const AdminHome = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // log out function
  const handleLogOut = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/logout`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Admin-token")}`,
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
    localStorage.removeItem("Admin-token");
    navigate("/log-in");
  };

  return (
    <>
      {/* Mobile Navbar - only visible on small screens */}
      <div className="bg-gray-700 flex justify-between items-center p-2 px-4 sm:hidden">
        <h2 className="text-gray-300 text-lg font-semibold tracking-wider">
          CourseCrate
        </h2>
        <div className="ml-4 flex gap-2">
          <div className="relative">
            <FaUser
              onClick={() => setShowDropdown(!showDropdown)}
              className="text-white text-xl cursor-pointer hover:text-blue-300"
            />
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -right-4 mt-4 bg-[#5f5959ee] rounded-md shadow-md w-28 text-sm space-y-2"
              >
                <button
                  className="w-full text-left my-2 px-4 hover:text-white"
                  onClick={() => navigate("/Update-Admin")}
                >
                  Update Admin
                </button>
                <button
                  className="w-full text-left px-4 mb-2 hover:text-white"
                  onClick={handleLogOut}
                >
                  Logout
                </button>
              </motion.div>
            )}
          </div>
          <div onClick={() => setOpen(!open)}>
            <RiMenu2Fill className="text-white text-xl cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="absolute right-2 z-20 top-14 sm:hidden"
          >
            <div className="text-gray-200 bg-cyan-500/60 max-w-sm h-auto mx-auto rounded-xl">
              <div className="flex flex-col gap-4 p-2 text-lg">
                <Link to="/Create-course" className="hover:text-blue-500">
                  Create Course
                </Link>

                <Link to="/Course" className="hover:text-blue-500">
                  Courses
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar layout - only visible from md and above */}
      <div className="hidden sm:flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gradient-to-b from-[#1f1f1f] to-[#2c2c2c] p-4 shadow-lg flex flex-col items-center text-white">
          <p className="text-lg font-semibold mb-6 mt-12">Hi, Admin</p>

          <Link
            to={"/Course"}
            className="text-center w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 mb-2 rounded-md transition-all duration-200 cursor-pointer"
          >
            Courses
          </Link>
          <Link
            to={"/Create-course"}
            className="text-center w-full bg-orange-500 hover:bg-orange-600 text-white py-2 mb-2 rounded-md transition-all duration-200 cursor-pointer"
          >
            Create Course
          </Link>
          <Link
            to={"/Update-Admin"}
            className="text-center w-full bg-rose-600 hover:bg-rose-700 text-white py-2 mb-2 rounded-md transition-all duration-200 cursor-pointer"
          >
            Update Admin
          </Link>
          <button
            onClick={handleLogOut}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 rounded-md transition-all duration-200 cursor-pointer"
          >
            Logout
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-[#141414] to-[#1e1e1e] text-white">
          <h1 className="text-2xl font-semibold">Welcome!!!</h1>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
