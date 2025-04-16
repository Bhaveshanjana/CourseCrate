const userService = require("../services/user.service");
const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");
const blacklistUser = require("../models/blackListToken");
const purchase = require("../models/buyCourse.model");
const course = require("../models/course.model");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, email, password } = req.body;
  const existUser = await userModel.findOne({ email });
  if (existUser) {
    return res.status(400).json({ message: " User already exist" });
  }
  const hashPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstname: username.firstname,
    lastname: username.lastname,
    email,
    password: hashPassword,
  });
  res.status(201).json({ user });
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const isMatch = await user.camparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const token = user.genAuthToken();
  res.cookie("token", token);
  res.json({ user, token });
};
module.exports.getUserProfile = async (req, res, next) => {
  res.json(req.user);
};
module.exports.logOutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await blacklistUser.create({ token });
  return res.status(200).json({ message: "User logged out" });
};

module.exports.updateUser = async (req, res) => {
  const { email, newEmail, password, newPassword } = req.body;

  try {
    const valid = await userModel.findOne({ email }).select("+password");
    if (!valid) {
      return res.status(404).json({ errors: "Invalid email or password" });
    }
    const camparepassword = await valid.camparePassword(
      password,
      valid.password
    );
    if (!camparepassword) {
      return res.status(404).json({ errors: "Invalid email or password" });
    }
    const hashedNewPassword = await userModel.hashPassword(newPassword);

    const updateduser = await userModel.findOneAndUpdate({
      password: hashedNewPassword,
      email: newEmail,
    });
    res.status(201).json({ message: "User details updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ errors: "Internal server error while updating user" });
  }
};

module.exports.purchased = async (req, res) => {
  const userId = req.user._id;

  try {
    const purchased = await purchase.find({ userId });

    let purchasedCourseId = [];

    for (let i = 0; i < purchased.length; i++) {
      purchasedCourseId.push(purchased[i].courseId);
    }
    const courseData = await course.find({
      _id: { $in: purchasedCourseId },
    });

    res.status(201).json({ purchased, courseData });
  } catch (error) {
    res
      .status(500)
      .json({ errors: "Internal server error while getting course data" });
  }
};