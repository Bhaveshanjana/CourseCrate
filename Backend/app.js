const dotenv = require("dotenv").config();

const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");

const userRoutes = require("./routes/user.router");
const courseRouter = require("./routes/course.router");
const adminRouter = require("./routes/admin.router");

const express = require("express");
const app = express();
const cors = require("cors");

const cookiParser = require("cookie-parser");
const connectTodb = require("./db/db");

connectTodb();

app.use(cookiParser());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("hello there");
});

//uploading file
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//config the cloud for img
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

app.use("/users", userRoutes);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

module.exports = app;
