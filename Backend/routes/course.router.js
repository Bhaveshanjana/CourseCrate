const express = require("express");
const { body } = require("express-validator");
const courseController = require("../controller/course.controller");
const authUser = require("../middlewares/user.middleware");
const authAdmin = require("../middlewares/admin.middleware");

const router = express.Router();

router.post(
    "/create",
    [
        body("title")
            .isString()
            .isLength({ min: 10 })
            .withMessage("Please provide an vaild title"),
        body("description")
            .isString()
            .isLength({ min: 10 })
            .withMessage("Please provide an vaild description"),
        body("price").isInt().withMessage("Please provide an vaild price"),
    ],
    authAdmin.authAdmin,
    courseController.createCourse
);

router.put("/update/:courseId", authAdmin.authAdmin, courseController.updateCourse);

router.delete("/delete/:courseId", authAdmin.authAdmin, courseController.deleteCourse);

router.get("/getAllCourses",  courseController.getAllCourse);

router.get("/:courseId", authUser.authUser, courseController.courseId);

router.post("/buy/:courseId",authUser.authUser, courseController.buyCourse)

module.exports = router;
