import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/course/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Admin-token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Course created successfully");
      navigate("Admin-home");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.msg ||
        "Something went wrong. Please try again.";
      console.log(error);

      toast.error(message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white px-4 md:px-0">
      <div className="w-full max-w-md bg-[#1f1f1f] p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Course</h2>

        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="space-y-5"
        >
          <div>
            <label className="block mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Enter your course title"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Enter your course description"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              placeholder="Enter your course price"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2">Course Image</label>
            {image && (
              <img
                src={image}
                alt="Preview"
                className="w-full h-40 object-cover rounded-md mb-2"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-2 rounded-md font-semibold"
          >
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
