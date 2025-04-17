import axios from "axios";
import React, { useState } from "react";
import { GoHome } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const signup = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const newUser = {
    username: {
      firstname: firstname,
      lastname: lastname,
    },
    email: email,
    password: password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Api call for register user
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );
      if (response.status === 201) {
        toast.success("User Signup successfully");
        navigate("/log-in");
      }
    } catch (error) {
      if (error.response?.data.message) {
        toast.error(`${error.response?.data.message}`);
      }
      toast.error(`${error.response?.data.errors[0].msg}`);
    }
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-900 px-4">
        {/* Navbar */}
        <div className="flex flex-wrap justify-center ml-4 gap-6 md:justify-between items-center py-4">
          <h1 className="text-white text-2xl">CourseCrate</h1>
          <div className="flex gap-3 mt-2 sm:mt-0">
            <Link
              to={"/log-in"}
              className="bg-white border px-4 py-1 rounded-md hover:bg-yellow-400/60 hover:text-white transition"
            >
              Login as User
            </Link>
            <Link to={"/Admin-Login"} className="bg-orange-400/90 px-3 py-1 rounded-md hover:bg-white hover:text-black transition">
              Login as admin
            </Link>
            <Link to={"/"}>
              <GoHome className="text-white text-2xl hover:text-orange-400 mt-1" />
            </Link>
          </div>
        </div>

        {/* Signup Form */}
        <div className="flex-grow flex items-center justify-center">
          <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg">
            <h1 className="text-xl text-center text-white font-bold mb-2">
              Welcome to <span className="text-orange-300">Courseheaven</span>
            </h1>
            <p className="text-center text-sm text-gray-300 mb-4">
              Sign-up to join us!
            </p>
            <form onSubmit={handleSubmit} className="space-y-4 text-white">
              <div>
                <label>Firstname</label>
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Firstname"
                  className="w-full p-2 rounded-md bg-gray-700 mt-1"
                />
              </div>
              <div>
                <label>Lastname</label>
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Lastname"
                  className="w-full p-2 rounded-md bg-gray-700 mt-1"
                />
              </div>
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
                  placeholder="*******"
                  className="w-full p-2 rounded-md bg-gray-700 mt-1"
                />
              </div>
              <button
                type="submit"
                disabled={!email || !password}
                className="w-full bg-red-400 hover:bg-red-500 text-white font-medium py-2 rounded-md transition"
              >
                Signup
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default signup;
