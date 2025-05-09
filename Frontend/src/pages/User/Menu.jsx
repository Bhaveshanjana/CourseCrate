import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

const Menu = ({ open }) => {
  const location = useLocation();
  return (
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
                to={"/"}
                className="hover:text-blue-500 transition-all duration-200"
              >
                Home
              </Link>
              <Link
                to={"/Purchased"}
                className="hover:text-blue-500 transition-all duration-200"
              >
                Purchased
              </Link>
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
  );
};

export default Menu;
