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
        toast.error(toast.error(`${error.response?.data.message}`));
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
      <div className="">
        {/* --Navbar-- */}

        <div className=" flex justify-around space-x-250">
          <h1 className="mt-5 text-2xl text-white">CourseCrate</h1>
          <div className="mt-5 space-x-4 flex items-center">
            <Link
              to={"/log-in"}
              className="bg-white border p-0.5 px-4 rounded-md cursor-pointer hover:bg-yellow-400/60 transition-all duration-300 hover:text-white"
            >
              Login
            </Link>
            <button className="bg-orange-400/90  px-2 rounded-md text-lg cursor-pointer">
              Join Now
            </button>
            <Link to={"/"}>
              <GoHome className="text-white text-2xl cursor-pointer hover:text-orange-400 transition-all duration-200" />
            </Link>
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
                value={firstname}
                placeholder="Firstname..."
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                className="p-2 bg-gray-700 w-full rounded-md"
              />
              <p>Lastname</p>
              <input
                type="text"
                value={lastname}
                placeholder="Lastname..."
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                className="p-2 bg-gray-700 w-full rounded-md"
              />
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
                value={password}
                placeholder="*******"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="p-2 bg-gray-700 w-full rounded-md"
              />
              <button
                disabled={!email || !password}
                className="w-full bg-red-400 rounded-md p-1.5 mt-4 mb-2 cursor-pointer hover:bg-blue-950/80 transition-all duration-200"
              >
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default signup;
