import axios from "axios";
import React, { useContext, useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserDataContext } from "../context/userContext";
import { GoHome } from "react-icons/go";

const login = () => {
  const { user, setUser } = useContext(UserDataContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      email: email,
      password: password,
    };

    // Api call for logging user
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        newUser
      );
      if (response.status === 200) {
        toast.success(`Welcome, ${response.data.user.username.firstname}`);
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/");
      }
    } catch (error) {
      if (error.response?.data.message) {
        toast.error(toast.error(`${error.response?.data.message}`));
      }

      toast.error(`${error.response?.data.errors[0]?.msg}`);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="">
        {/* --Navbar-- */}

        <div className=" flex justify-around space-x-250 ">
          <h1 className="mt-5 text-2xl text-white">CourseCrate</h1>
          <div className="mt-5 space-x-4 flex items-center">
            <Link
              to={"/sign-up"}
              className="bg-white border p-0.5 px-4 rounded-md cursor-pointer hover:bg-yellow-400/60 transition-all duration-300 hover:text-white"
            >
              Signup
            </Link>
            <button className="bg-orange-400/90 p-0.5 px-3 rounded-md cursor-pointer hover:bg-white transition-all duration-200">
              Join as admin
            </button>
            <Link to={"/"}>
              <GoHome className="text-white text-2xl cursor-pointer hover:text-orange-400 transition-all duration-200" />
            </Link>
          </div>
        </div>

        {/* --Signup form-- */}

        <div className="mt-44 bg-gray-900 mx-auto max-w-[450px] rounded-md ">
          <h1 className="text-center pt-4 mb-2 text-xl text-white">
            Welcome to <span className="text-orange-300">Courseheaven</span>
          </h1>
          <p className="text-center text-lg text-white">
            Login to access paid content
          </p>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="p-6 "
          >
            <div className="text-lg text-white space-y-2 ">
              <p>Email</p>
              <input
                type="email"
                value={email}
                placeholder="example@gmail.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="p-2 bg-gray-700 w-full rounded-md"
              />
              <p>Password</p>
              <input
                type="password"
                required
                value={password}
                placeholder="******"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="p-2 bg-gray-700 w-full rounded-md"
              />
              <button className="w-full bg-red-400 rounded-md p-1.5 mt-4 mb-2 cursor-pointer hover:bg-blue-950/80 transition-all duration-200">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default login;
