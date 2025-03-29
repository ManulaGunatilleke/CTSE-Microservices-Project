const Enrollment = require("../models/enrollment");

// Create Enrollment
const createEnrollment = async (req, res) => {
    const { userId, courseId, additionalInfo } = req.body;

    const newEnrollment = new Enrollment({
        userId,
        courseId,
        enrollmentDate: new Date(), 
        status: 'pending',
        additionalInfo
    });

    try {
        const savedEnrollment = await newEnrollment.save();
        res.status(201).json(savedEnrollment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create enrollment" });
    }
};

// Get All Enrollments
const getAllEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find();
        res.json(enrollments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve enrollments" });
    }
};

// Get Enrollments by User
const getEnrollmentsByUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        const enrollments = await Enrollment.find({ userId });
        res.json(enrollments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve enrollments" });
    }
};

// Get Enrollments by Course
const getEnrollmentsByCourse = async (req, res) => {
    const courseId = req.params.courseId;

    try {
        const enrollments = await Enrollment.find({ courseId });
        res.json(enrollments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve enrollments" });
    }
};

// Update Enrollment Status
const updateEnrollmentStatus = async (req, res) => {
    const enrollmentId = req.params.enrollmentId;
    const { status } = req.body;

    try {
        await Enrollment.findByIdAndUpdate(enrollmentId, { status });
        res.json({ message: "Enrollment status updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update enrollment status" });
    }
};

// Cancel Enrollment
const cancelEnrollment = async (req, res) => {
    const enrollmentId = req.params.enrollmentId;

    try {
        await Enrollment.findByIdAndUpdate(enrollmentId, { status: "canceled" });
        res.json({ message: "Enrollment canceled successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to cancel enrollment" });
    }
};

// Check Enrollment Status
const checkEnrollmentStatus = async (req, res) => {
    const enrollmentId = req.params.enrollmentId;

    try {
        const enrollment = await Enrollment.findById(enrollmentId);
        res.json({ status: enrollment.status });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve enrollment status" });
    }
};

// Get Enrollments by User and Course
const getEnrollmentByUserCourse = async (req, res) => {
    const { userId, courseId } = req.params;

    try {
        const enrollment = await Enrollment.findOne({ userId, courseId });
        if (!enrollment) {
            return res.status(404).json({ message: "Enrollment not found" });
        }
        res.json(enrollment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve enrollment" });
    }
};

module.exports = {
    createEnrollment,
    getEnrollmentsByUser,
    getAllEnrollments,
    getEnrollmentsByCourse,
    updateEnrollmentStatus,
    cancelEnrollment,
    checkEnrollmentStatus,
    getEnrollmentByUserCourse
};
