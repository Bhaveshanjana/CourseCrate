const adminModel = require("../models/admin.model");

module.exports.createAdmin = async ({
    firstname,
    lastname,
    password,
    email,
}) => {
    if(!firstname || !email || !password){
        throw new Error ("Please provide all fields")
    }
    const admin = await adminModel.create({
        adminname: {
            firstname,
            lastname,
        },
        email,
        password,
    });
    return admin;
};

