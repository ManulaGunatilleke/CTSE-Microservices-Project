const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
    Instructorname: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        default : "instructor"
    },
    Password: {
        type: String,
        required: true
    }
})

const instructor = mongoose.model("instructor",instructorSchema);
module.exports = instructor;