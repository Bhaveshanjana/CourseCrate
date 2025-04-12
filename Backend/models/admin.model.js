const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  adminname: {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false
  },
});

//Generate Token
adminSchema.methods.genAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_ADMIN_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

//campare the password
adminSchema.methods.camparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//hash the password
adminSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const adminModel = mongoose.model("admin", adminSchema);

module.exports = adminModel;
