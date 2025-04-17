import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });

  // api call for fetching particular course by id
  const fetchCourse = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/course/${courseId}`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Admin-token")}`,
          },
        }
      );

      const course = res.data.courses;
      setCourseData({
        title: course.title,
        description: course.description,
        price: course.price,
        image: null, // we’ll re-upload if changed
      });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.msg ||
        "Something went wrong. Please try again.";
      toast.error(message);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourseData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", courseData.title);
    formData.append("description", courseData.description);
    formData.append("price", courseData.price);
    if (courseData.image) {
      formData.append("image", courseData.image);
    }

    // Api call for updating course
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/v1/course/update/${courseId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Admin-token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Course updated successfully!");
      navigate("/Course");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.msg ||
        "Something went wrong. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-6 p-6 bg-[#1a1a1a] rounded-xl text-white shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Update Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={courseData.title}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#2a2a2a] border border-gray-600"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={courseData.description}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#2a2a2a] border border-gray-600"
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={courseData.price}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#2a2a2a] border border-gray-600"
        />
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full text-sm text-gray-400 file:bg-[#333] file:border-none file:rounded file:px-4 file:py-2 file:cursor-pointer"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"
        >
          Update Course
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;
