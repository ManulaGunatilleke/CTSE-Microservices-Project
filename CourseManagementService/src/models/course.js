const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({

    UserId: {
        type: String,
        required: true
    },
    CourseName: {
        type: String,
        required: true
    },
    CourseCode: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Instructor: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    Image: {
        type: String,
        required: true
    },
    Duration: {
        type: Number,
        required: true
    },
    VideoLink: {
        type: String,
        required: true
    }

})

const course = mongoose.model("course",courseSchema);
module.exports = course;