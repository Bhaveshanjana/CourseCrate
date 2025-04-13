import React, { useEffect, useState } from "react";
import axios from "axios";

const Purchase = () => {
  const [purchased, setPurchased] = useState([]);
  useEffect(() => {
    const response = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/purchased`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPurchased(res.data.courseData);
      } catch (error) {
        console.log(error);
      }
    };
    response();
  }, []);
  return (
    <div>
      <div>
        <div className="text-white">
          {" "}
          {purchased.map((purchase, index) => (
            <div key={index}>
              <img src={purchase.image.url} alt="" className="w-9" />
              <p>{purchase.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Purchase;
