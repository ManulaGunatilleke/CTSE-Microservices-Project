const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    Fullname: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        default : "student"
    },
    Password: {
        type: String,
        required: false
    }
})

const student = mongoose.model("student",studentSchema);
module.exports = student;