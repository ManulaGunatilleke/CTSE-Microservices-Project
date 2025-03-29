const router = require("express").Router();
const helmet = require('helmet');

const { allInstructor, updateInstructor, deleteiIstructor, singleInstructor, searchInstructors } = require('../controllers/instructorController');

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

// Get all the instructors
router.get("/", allInstructor);

// Update a instructor
router.put("/update/:id", updateInstructor);

// Delete a single instructor
router.delete("/delete/:id", deleteiIstructor);

// Get details of a single instructor
router.get("/get/:id", singleInstructor);

// search instructors
router.get("/search/:key", searchInstructors);

module.exports = router;