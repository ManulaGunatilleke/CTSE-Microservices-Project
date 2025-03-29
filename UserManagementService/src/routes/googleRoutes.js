const express = require('express');
const router = express.Router();
const googleController = require("../controllers/googleController");

// Google login route
router.get("/google", googleController.googleLogin);

// Google OAuth callback
router.get("/google/callback", googleController.googleCallback);

// Google login success
router.get("/login/success", googleController.loginSuccess);

// Google login failure
router.get("/login/failed", googleController.loginFailure);

// Logout route
router.get("/logout", googleController.logoutUser);

module.exports = router;
