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

      toast.error(`${error.response?.data?.errors[0]?.msg}`);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-900 px-4">
        {/* Navbar */}
        <div className="flex flex-wrap justify-center gap-4 ml-6 md:justify-between items-center py-4">
          <h1 className="text-white text-2xl">CourseCrate</h1>
          <div className="flex gap-3 mt-2 sm:mt-0">
            <Link
              to={"/sign-up"}
              className="bg-white border px-4 py-1 rounded-md hover:bg-yellow-400/60 hover:text-white transition"
            >
              Signup
            </Link>
            <Link
              to={"/Admin-Signup"}
              className="bg-orange-400/90 px-3 py-1 rounded-md hover:bg-white hover:text-black transition"
            >
              Signup as admin
            </Link>
            <Link to={"/"}>
              <GoHome className="text-white text-2xl hover:text-orange-400 mt-1" />
            </Link>
          </div>
        </div>

        {/* Login Form */}
        <div className="flex-grow flex items-center justify-center">
          <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg">
            <h1 className="text-xl text-center text-white font-bold mb-2">
              Welcome to <span className="text-orange-300">Courseheaven</span>
            </h1>
            <p className="text-center text-sm text-gray-300 mb-4">
              Login to access paid content
            </p>
            <form onSubmit={handleSubmit} className="space-y-4 text-white">
              <div>
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  className="w-full p-2 rounded-md bg-gray-700 mt-1"
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="******"
                  className="w-full p-2 rounded-md bg-gray-700 mt-1"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-400 hover:bg-red-500 text-white font-medium py-2 rounded-md transition"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default login;
