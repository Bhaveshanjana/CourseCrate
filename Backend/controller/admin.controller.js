const adminService = require("../services/admin.services");
const adminModel = require("../models/admin.model");
const { validationResult } = require("express-validator");

module.exports.registerAdmin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { adminname, email, password } = req.body;
  const existAdmin = await adminModel.findOne({ email });
  if (existAdmin) {
    return res.status(400).json({ message: " admin already exist" });
  }
  const hashPassword = await adminModel.hashPassword(password);

  const admin = await adminService.createAdmin({
    firstname: adminname.firstname,
    lastname: adminname.lastname,
    email,
    password: hashPassword,
  });
  res.status(201).json({ admin });
};

module.exports.loginAdmin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const admin = await adminModel.findOne({ email }).select("+password");
  if (!admin) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const isMatch = await admin.camparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const token = admin.genAuthToken();
  res.cookie("token", token);
  res.json({ admin, token });
};

module.exports.logout = async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Admin logged out" });
};

module.exports.getprofile = async (req, res) => {
  res.status(200).json({admin: req.admin})
};

module.exports.updateadmin = async (req, res) => {
  const { email, newEmail, password, newPassword } = req.body;
  try {
    const isVaild = await adminModel.findOne({ email }).select("+password");
    if (!isVaild) {
      return res.status(404).json({ errors: "Invaild email or password" });
    }
    const camparepassword = await isVaild.camparePassword(
      password,
      isVaild.password
    );
    if (!camparepassword) {
     return res.status(404).json({ errors: "Invaild email or password" });
    }

    const hashedPassword = await adminModel.hashPassword(newPassword);

    const updateAdmin = await adminModel.findOneAndUpdate({
      password: hashedPassword,
      email: newEmail,
    });
    res.status(200).json({message: "Admin updated successfully"})
  } catch (error) {
    res
      .status(500)
      .json({ errors: "Internal server error while updating admin profile" });
  }
};
