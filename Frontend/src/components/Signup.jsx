import React from "react";
import { Link } from "react-router-dom";

const signup = () => {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <>
      <div className="">
        {/* --Navbar-- */}

        <div className=" flex justify-around space-x-250 border-b-2 border-yellow-300/60 ">
          <h1 className="mt-5 text-2xl text-white">CourseCrate</h1>
          <div className="mt-5 space-x-4 ">
            <Link
              to={"/log-in"}
              className="bg-white border p-1 px-4 rounded-md cursor-pointer"
            >
              Login
            </Link>
            <button className="bg-orange-400/90  px-2 rounded-md text-lg cursor-pointer">
              Join Now
            </button>
          </div>
        </div>

        {/* --Signup form-- */}

        <div className="mt-20 bg-gray-900 mx-auto max-w-[450px] rounded-md">
          <h1 className="text-center pt-4 mb-2 text-xl text-white">
            Welcome to <span className="text-orange-300">Courseheaven</span>
          </h1>
          <p className="text-center text-lg text-white">Sign-up to join us!</p>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="p-6 "
          >
            <div className="text-lg text-white space-y-2">
              <p>firstname</p>
              <input
                type="text"
                name=""
                id=""
                placeholder="Firstname..."
                onChange={(e) => {
                  e.target.value;
                }}
                className="p-2 bg-gray-700 w-full rounded-md"
              />
              <p>Lastname</p>
              <input
                type="text"
                name=""
                id=""
                placeholder="Lastname..."
                onChange={(e) => {
                  e.target.value;
                }}
                className="p-2 bg-gray-700 w-full rounded-md"
              />
              <p>Email</p>
              <input
                type="email"
                name=""
                id=""
                placeholder="example@gmail.com"
                onChange={(e) => {
                  e.target.value;
                }}
                className="p-2 bg-gray-700 w-full rounded-md"
              />
              <p>Password</p>
              <input
                type="password"
                name=""
                id=""
                placeholder="1234567"
                onChange={(e) => {
                  e.target.value;
                }}
                className="p-2 bg-gray-700 w-full rounded-md"
              />
              <Link
                // to={"/Sign-up"}
                className="flex items-center justify-center bg-red-400 rounded-md p-1.5 mt-4 mb-2 cursor-pointer"
              >
                Signup
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default signup;
