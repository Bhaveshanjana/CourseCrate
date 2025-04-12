const usermodel = require("../models/user.model");

module.exports.createUser = async ({
    firstname,
    lastname,
    email,
    password,
}) => {
    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ Message: "Please provide all filds" });
    }
    const user = usermodel.create({
        username: {
            firstname,
            lastname,
        },
        email,
        password,
    });
    return user;
};
