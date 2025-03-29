const router = require("express").Router();
const helmet = require('helmet');

const { authenticateadminAndInstructorRole,
        authenticateinstructorRole,
        authenticateinstructorAndStudentRole
} = require('../middleware/authenticationRole');

const {
    createCourse,
    getAllCoursesByUserId,
    getAllCourses,
    updateCourse,
    deleteCourse,
    viewOneCourseById,
    searchCourse
} = require("../controllers/courseController");

// CSP Header configuration
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

//Configuting X-Content-Type-Options Header
router.use(helmet.xContentTypeOptions());
 

//create new course
router.post("/addCourse", authenticateinstructorRole, createCourse);

//view all courses by user id
router.get("/getAllCourses/:id", getAllCoursesByUserId);

//view all courses
router.get("/publishedCourses", getAllCourses);

//update a course by id
router.put("/updateCourse/:id", authenticateadminAndInstructorRole, updateCourse);

//delete course by id
router.delete("/deleteCourse/:id", authenticateadminAndInstructorRole, deleteCourse);

//view one specific course by id
router.get("/getCourse/:id", authenticateinstructorAndStudentRole, viewOneCourseById);

//search course
router.get("/searchCourse/:key", searchCourse);

module.exports = router;