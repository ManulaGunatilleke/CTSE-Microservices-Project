// routes/checkoutRoutes.js
const express = require('express');
const router = express.Router();
const helmet = require('helmet');
const { createCheckoutSession } = require('../controllers/checkoutController');
const { authenticateStudentRole } = require('../middleware/authenticateRole');

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

router.post('/create-checkout-session', authenticateStudentRole, createCheckoutSession);

module.exports = router;
