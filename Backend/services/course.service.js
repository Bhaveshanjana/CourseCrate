const buyCourseModel = require("../models/buyCourse.model");
const courseModel = require("../models/course.model");

module.exports.createCourse = async ({ title, description, price, image, _id }) => {
    if (!title || !description || !price) {
        throw new Error("Please provide all Fields");
    }
    const course = await courseModel.create({
        title,
        description,
        price,
        image,
        creatorId:_id
    });
    return course;
};

module.exports.buyCourse = async ({ _id, courseId }) => {
    const buyCourse = await buyCourseModel.create({
        userId:_id,
        courseId,
    });
    return buyCourse;
};
