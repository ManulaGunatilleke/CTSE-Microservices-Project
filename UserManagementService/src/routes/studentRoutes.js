const router = require("express").Router();
const helmet = require('helmet');

const { allStudents, updateStudent, deleteStudent, singleStudent, searchstudents } = require('../controllers/studentController');

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

// Get all the students
router.get("/", allStudents);

// Update a student
router.put("/update/:id", updateStudent);

// Delete a single student
router.delete("/delete/:id", deleteStudent);

// Get details of a single student
router.get("/get/:id", singleStudent);

// search students
router.get("/search/:key", searchstudents);

module.exports = router;