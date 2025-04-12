const jwt = require("jsonwebtoken");
const adminModel = require("../models/admin.model");

module.exports.authAdmin = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authrorization?.split("  ")[1];
    if (!token) {
        return res.status(401).json({ errors: "Unauthorized admin" });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
        const admin = await adminModel.findById(decode._id);

        req.admin= admin._id;  
        
        return next();
    } catch (error) {
        res
            .status(500)
            .json({ errors: "Internal server erorr please log in again" });
            console.log(error);
            
    }
};
