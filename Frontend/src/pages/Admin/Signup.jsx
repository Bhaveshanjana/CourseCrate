import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoHome } from "react-icons/go";

const Signup = () => {
  const [firstname, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const newAdmin = {
    adminname: { firstname },
    email,
    password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/register`,
        newAdmin
      );
      if (response.status === 201) {
        toast.success("Admin Signup successfully");
        navigate("/Admin-Login");
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.msg ||
        "Something went wrong.";
      toast.error(message);
    }

    setFirstName("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div>
        {/* Navbar */}
        <div className="bg-gray-700 flex justify-between items-center p-2 px-4 custom-scrollbar">
          <h2 className="text-gray-300 text-lg font-semibold tracking-wider">
            CourseCrate
          </h2>
          <GoHome
            onClick={() => {
              navigate("/log-in");
            }}
            className="text-2xl cursor-pointer transition-all hover:text-blue-500 duration-200"
          />
        </div>
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <div className="w-full max-w-sm bg-gray-800 rounded-lg p-6 shadow-md">
          <h1 className="text-center text-xl text-white font-bold mb-2">
            Welcome to <span className="text-orange-300">Courseheaven</span>
          </h1>
          <p className="text-center text-sm text-gray-300 mb-6">
            Sign-up to join us!
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-white">
              <label>Firstname</label>
              <input
                type="text"
                value={firstname}
                placeholder="Firstname..."
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-700 mt-1"
              />
            </div>
            <div className="text-white">
              <label>Email</label>
              <input
                type="email"
                value={email}
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-700 mt-1"
              />
            </div>
            <div className="text-white">
              <label>Password</label>
              <input
                type="password"
                value={password}
                placeholder="*******"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-700 mt-1"
              />
            </div>
            <button
              disabled={!email || !password}
              className="w-full bg-red-400 hover:bg-red-500 text-white font-medium py-2 rounded-md transition-all duration-200"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
