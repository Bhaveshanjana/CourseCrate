const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    price: {
        type: Number,
        required: true,
    },
    creatorId:{
        type:String,
        ref:"user"
    }
});

const couserModel = mongoose.model("course", courseSchema);
module.exports = couserModel;
