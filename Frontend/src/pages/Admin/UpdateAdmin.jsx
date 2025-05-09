import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoHome } from "react-icons/go";

const UpdateAdmin = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateAdmin = {
      password: password,
      newPassword: newPassword,
      email: email,
      newEmail: newEmail,
    };
    // Api call for updating user
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/updateadmin`,
        updateAdmin,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Admin-token")}`,
          },
        }
      );

      toast.success(`${res.data.message}`);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.msg ||
        "Something went wrong. Please try again.";
      console.log(error);

      toast.error(message);
    }
    setEmail("");
    setNewEmail("");
    setPassword("");
    setNewPassword("");
  };
  return (
    <>
    {/* Navrbar */}
      <div className="flex justify-between max-w-[90%] mx-auto p-2 pt-4">
        <h2 className="text-gray-300 text-lg font-semibold tracking-wider ">
          CourseCrate
        </h2>
        <Link to={"/Admin-home"}>
          <GoHome className="text-white text-2xl cursor-pointer hover:text-orange-400 transition-all duration-200" />
        </Link>
      </div>
      {/* Form for updating user */}
      <div className="mt-28 bg-gray-900 mx-auto w-[350px] sm:w-[500px] rounded-md ">
        <h1 className="text-center text-gray-200 pt-3 text-lg">
          Update Admin details
        </h1>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="p-6 "
        >
          <div className="text-lg text-white space-y-2 ">
            <p>Old Email</p>
            <input
              type="email"
              value={email}
              placeholder="example@gmail.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="p-2 bg-gray-700 w-full rounded-md"
            />
            <p>New Email</p>
            <input
              type="email"
              value={newEmail}
              placeholder="example@gmail.com"
              onChange={(e) => {
                setNewEmail(e.target.value);
              }}
              className="p-2 bg-gray-700 w-full rounded-md"
            />
            <p>Old Password</p>
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
            <p>New Password</p>
            <input
              type="password"
              required
              value={newPassword}
              placeholder="******"
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              className="p-2 bg-gray-700 w-full rounded-md"
            />
            <button className="w-full bg-red-400 rounded-md p-1.5 mt-4 mb-2 cursor-pointer hover:bg-blue-950/80 transition-all duration-200">
              Update Admin
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateAdmin;
