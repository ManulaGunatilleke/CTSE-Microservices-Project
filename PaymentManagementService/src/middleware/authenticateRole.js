const axios = require('axios');
require('dotenv').config();

// Base URL from environment variables
const BASE_URL = process.env.BASE_URL;

const authenticateStudentRole = async (req, res, next) => {
    try {
        // Extract token from request headers
        const token = req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({ message: "Authorization token is required" });
        }

        // Send request to user management service to authenticate user's role
        const response = await axios.get(`${BASE_URL}/user/authenticate-role/student`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Check if authentication was successful
        if (response.status === 200 && response.data.message === "Student access granted") {
            next();
        } else {
            res.status(403).json({ message: "Access denied, user does not have STUDENT role" });
        }
    } catch (error) {
        console.error("Error authenticating user role:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const authenticateAdminRole = async (req, res, next) => {
    try {
        // Extract token from request headers
        const token = req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({ message: "Authorization token is required" });
        }

        // Send request to user management service to authenticate user's role
        const response = await axios.get(`${BASE_URL}/user/authenticate-role/admin`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Check if authentication was successful
        if (response.status === 200 && response.data.message === "Admin access granted") {
            next();
        } else {
            res.status(403).json({ message: "Access denied, user does not have ADMIN role" });
        }
    } catch (error) {
        console.error("Error authenticating user role:", error);
        res.status(403).json({ message: "Access denied, user does not have ADMIN role" });
    }
};

module.exports = {
    authenticateAdminRole,
    authenticateStudentRole
};