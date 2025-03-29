const express = require('express');
const router = express.Router();
const helmet = require('helmet');

const { adminRegister, registerStudent, registerInstructor, loginUser, validateToken } = require('../controllers/authController');

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

// Admin create account
router.post('/createAdmin', adminRegister);

// Student registering
router.post('/registerStudent', registerStudent);

// Instructor registering
router.post('/registerInstructor', registerInstructor);

// Login a user
router.post('/login', loginUser);

//validate the google login token
router.post('/validate-token', validateToken);


module.exports = router;