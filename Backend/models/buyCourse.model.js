const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: "course",
    },
});

const purchase = mongoose.model("buyCourse", courseSchema);

module.exports = purchase;