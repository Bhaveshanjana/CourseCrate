const express = require("express");
const { body } = require("express-validator");
const userController = require("../controller/user.controller");
const  authUser  = require("../middlewares/user.middleware");

const router = express.Router();

router.post(
    "/register",
    [
        body("email").isEmail().withMessage("invalid email address"),
        body("username.firstname")
            .isLength({ min: 3 })
            .withMessage("Firstname must be 3 characters long"),
        body("password")
            .isLength({ min: 5 })
            .withMessage("Password must be 5 characters long"),
    ],
    userController.registerUser
);
router.post(
    "/login",
    [
        body("email").isEmail().withMessage("invalid email"),
        body("password")
            .isLength({ min: 5 })
            .withMessage("password must be 5 characters long"),
    ],
    userController.loginUser
);
router.get("/logout", authUser.authUser, userController.logOutUser);
router.get("/getprofile", authUser.authUser, userController.getUserProfile);
router.put("/updateuser", userController.updateUser);
router.get("/purchased",authUser.authUser, userController.purchased);

module.exports = router;
