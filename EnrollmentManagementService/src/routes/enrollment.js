const router = require("express").Router();
const helmet = require('helmet');
//const { isAdmin, isInstructor, isStudent } = require("../../../UserManagementService/src/middleware/authMiddleware");
const { isAdmin, isInstructor, isStudent } = require("../middleware/authMiddleware");

// Configure csp headers
router.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'", "'trusted-default.com'"],
        scriptSrc: ["'self'",'https://cdnjs.cloudflare.com', 'https://ajax.googleapis.com', 'https://code.jquery.com'],
        styleSrc: ["'self'",'https://fonts.googleapis.com', 'https://stackpath.bootstrapcdn.com'],
        imgSrc: ["'self'", 'https://images.unsplash.com', 'data:'],
        fontSrc : ["'self'", 'https://fonts.gstatic.com', 'https://use.fontawesome.com'],
        connectSrc : ["'self'", 'https://api.mybackend.com', 'https://www.googleapis.com'],
        objectSrc : ["'none'"],
        frameSrc : ["'none'"],
    }
}))

// X-Content-Type-Options Header
router.use(helmet.xContentTypeOptions());

const {
    createEnrollment,
    getEnrollmentsByUser,
    getAllEnrollments,
    getEnrollmentsByCourse,
    updateEnrollmentStatus,
    cancelEnrollment,
    checkEnrollmentStatus,
    getEnrollmentByUserCourse
} = require("../controllers/enrollmentController");

// Create Enrollment
router.post("/createEnrollment", createEnrollment);

// Get All Enrollments
router.get("/getAllEnrollments", getAllEnrollments);

// Get Enrollments by User
router.get("/user/:userId", getEnrollmentsByUser);

// Get Enrollments by Course
router.get("/course/:courseId", getEnrollmentsByCourse);

// Update Enrollment Status
router.put("/updateStatus/:enrollmentId", updateEnrollmentStatus);

// Cancel Enrollment
router.put("/cancel/:enrollmentId", isAdmin, cancelEnrollment);

// Check Enrollment Status
router.get("/status/:enrollmentId", isAdmin, checkEnrollmentStatus);

// Get Enrollment by User and Course
router.get("/user/:userId/course/:courseId", getEnrollmentByUserCourse);

module.exports = router;
