const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    UserId: {
        type: String,
        required: true
    },
    CourseId: {
        type: String,
        required: true
    },
    CourseCode: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    PaymentDate: {
        type: Date,
        required: true
    }
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
