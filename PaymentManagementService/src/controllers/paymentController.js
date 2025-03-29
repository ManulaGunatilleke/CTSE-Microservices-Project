const Payment = require("../models/payment");

// Create a new payment
const createPayment = async (req, res) => {
    console.log(req.body)
    const { UserId, CourseId, CourseCode, Price } = req.body;

    if (!UserId || !CourseId || !CourseCode || !Price || Price <= 0) {
        return res.status(400).json({ message: 'Invalid payment data' });
    }

    const newPayment = new Payment({
        UserId,
        CourseId,
        CourseCode,
        Price,
        PaymentDate: new Date()
    });

    try {
        await newPayment.save();
        res.status(201).json({ message: 'Payment created successfully' });
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.json(payments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve payments" });
    }
};

module.exports = {
    createPayment,
    getAllPayments
};
