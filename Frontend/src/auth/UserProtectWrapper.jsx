import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { toast } from "react-toastify";

const UserProtectWrapper = ({ children }) => {
  const { user, setUser } = useContext(UserDataContext);
  const [isloading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/log-in");
    }
    try {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/users/getprofile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      navigate("/log-in");
      localStorage.removeItem("token");
    }
  }, [token]);

  if (isloading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default UserProtectWrapper;
