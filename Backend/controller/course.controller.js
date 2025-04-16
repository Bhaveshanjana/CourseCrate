const { validationResult } = require("express-validator");
const courseService = require("../services/course.service");
const cloudinary = require("cloudinary");
const couserModel = require("../models/course.model");
const purchase = require("../models/buyCourse.model");

module.exports.createCourse = async (req, res) => {
  const {_id} = req.admin;
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, price, description } = req.body;
  const { image } = req.files;
  if (!req.files) {
    return res.status(400).json({ errors: "Please provide an image" });
  }
  const formates = ["image/png", "image/jpeg"];
  if (!formates) {
    return res
      .status(400)
      .json({ errors: "invalid file formates only Jpeg and png supported" });
  }

  //upload img to cloud-
  const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);
  if (!cloud_response || cloud_response.error) {
    return res
      .status(400)
      .json({ errors: "Error while uploading image to cloudinary" });
  }

  const data = await couserModel.findOne({ description, title });
  if (data) {
    return res.status(400).json({ errors: "Duplicate value Provided " });
  }
  const course = await courseService.createCourse({
    price,
    description,
    image: {
      public_id: cloud_response.public_id,
      url: cloud_response.secure_url,
    },
    title,
    _id
  });
  return res.status(200).json({ course });
};

module.exports.updateCourse = async (req, res) => {
  const{_id} = req.admin;
  const { courseId } = req.params;
  const { title, description, price, image } = req.body;

  try {
    const newCourse = await couserModel.updateOne(
      { _id: courseId,
        creatorId:_id
       },
      { description, price, title, image }
    );
    res.status(200).json({ message: "Course updated successfully" });
  } catch (error) {
    res.status(500).json({ errors: "Internal server Error while updating course" });
  }
};

module.exports.deleteCourse = async (req, res) => {
  const { courseId } = req.params;
  const{_id} = req.admin;
  try {
    const newData = await couserModel.findOneAndDelete({ _id: courseId, creatorId:_id });
    if (!newData) {
      res.status(404).json({ errors: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ errors: "Internal server Error while deleting course" });
    
  }
};

module.exports.getAllCourse = async (req, res) => {
  try {
    const courses = await couserModel.find({});
    if (courses.length > 0) {
      return res.status(200).json({ courses });
    }
    res.status(404).json({ errors: "No course found create one to show here" });
  } catch (error) {
    return res.status(500).json({ errors: "Internal server error while getting courses" });
  }
};

module.exports.courseId = async (req, res) => {
  const { courseId } = req.params;
  try {
    const courses = await couserModel.findById(courseId);
    if (!courses) {
      return res.status(404).json({ errors: "invalid course id" });
    }
    res.status(201).json({ courses });
  } catch (error) {
    res.status(500).json({ errors: "Error while getting courses" });
  }
};

module.exports.buyCourse = async (req, res) => {
  const { _id } = req.user;
  const { courseId } = req.params;

  try {
    const existingCourse = await purchase.findOne({userId:_id, courseId});
    if (existingCourse) {
      return res.status(400).json({ errors: "Course already purchased" });
    }
    const availableCourse = await couserModel.findById(courseId);
    if (!availableCourse) {
      return res.status(400).json({ errors: "course not available" });
    }

    const createCourse = await courseService.buyCourse({
      _id,
      courseId,
    });
    return res.status(200).json({ message: "course purchased successfully",createCourse });
  } catch (error) {
    res
      .status(500)
      .json({ errors: "Internal server error while buying course" });
  }
};
