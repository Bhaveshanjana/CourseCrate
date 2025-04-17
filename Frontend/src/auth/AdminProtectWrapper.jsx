import React, { useContext, useEffect, useState } from "react";
import { AdminDataContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { toast } from "react-toastify";

const AdminProtectWrapper = ({ children }) => {
  const { admin, setAdmin } = useContext(AdminDataContext);
  const [isloading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("Admin-token");

  useEffect(() => {
    if (!token) {
      navigate("/log-in");
    }
    try {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/getprofile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setAdmin(response.data);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      navigate("/log-in");
      localStorage.removeItem("Admin-token");
    }
  }, [token]);

  if (isloading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AdminProtectWrapper;
