import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const { user, setUser } = useContext(UserDataContext);
  const [isloading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  if (!token) {
    navigate("/log-in");
  }
  useEffect(() => {
    try {
      axios
        .get(`${import.meta.env.BASE_VITE_URL}/users/getprofile`, {
          Headers: {
            Authorization: `Bearer${token}`,
          },
        })
        .then((response) => {
          if (response.data === 200) {
            setUser(response.data);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("token");
          navigate("/log-in");
        });
    } catch (error) {
      console.log("Unauthorized user", user);
    }
  }, [token]);

  if (isloading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default UserProtectWrapper;
