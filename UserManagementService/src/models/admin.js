const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    Adminname: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        default : "admin"
    },
    Password: {
        type: String,
        required: true
    }
})

const admin = mongoose.model("admin",adminSchema);
module.exports = admin;