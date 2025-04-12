const express = require("express");
const { body } = require("express-validator");
const adminController = require("../controller/admin.controller");
const authAdmin = require("../middlewares/admin.middleware");

const router = express.Router();

router.post(
    "/register",
    [
        body("email").isEmail().withMessage("invalid email address"),
        body("adminname.firstname")
            .isLength({ min: 2 })
            .withMessage("Firstname must be 3 characters long"),
        body("password")
            .isLength({ min: 5 })
            .withMessage("Password must be 5 characters long"),
    ],
    adminController.registerAdmin
);
router.post(
    "/login",
    [
        body("email").isEmail().withMessage("invalid email"),
        body("password")
            .isLength({ min: 5 })
            .withMessage("password must be 5 characters long"),
    ],
    adminController.loginAdmin
);
router.get("/logout", authAdmin.authAdmin, adminController.logout);
router.get("/getprofile", authAdmin.authAdmin, adminController.getprofile);
router.put("/updateadmin", authAdmin.authAdmin, adminController.updateadmin);

module.exports = router;
