import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AdminDataContext } from "../../context/AdminContext";
import axios from "axios";

const Login = () => {
  const { admin, setAdmin } = useContext(AdminDataContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAdmin = {
      email: email,
      password: password,
    };

    // Api call for logging admin
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/login`,
        newAdmin
      );

      toast.success(`Welcome, ${response.data.admin.adminname.firstname}`);
      const data = response.data;
      setAdmin(data);
      localStorage.setItem("Admin-token", data.token);
      navigate("/Admin-home");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.msg ||
        "Something went wrong. Please try again.";

      toast.error(message);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="mt-44 bg-gray-900 mx-auto max-w-[450px] rounded-md ">
      <h1 className="text-center pt-4 mb-2 text-xl text-white">
        Welcome to <span className="text-orange-300">Courseheaven</span>
      </h1>
      <p className="text-center text-[16px] text-white">
        Login as admin to countinue
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
  );
};

export default Login;
