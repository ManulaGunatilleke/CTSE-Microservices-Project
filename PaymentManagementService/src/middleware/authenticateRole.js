const axios = require('axios');
const https = require('https');
require('dotenv').config();

const agent = new https.Agent({  
    rejectUnauthorized: false  
  });

const BASE_URL = process.env.BASE_URL;

const authenticateStudentRole = async (req, res, next) => {
    try {
        // Extract token from request headers
        const token = req.headers.authorization.split(" ")[1];

        // Send request to user management service to authenticate user's role
        const response = await axios.get(`${BASE_URL}/user/authenticate-role/student`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            httpsAgent: agent,
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

const authenticateadminRole = async (req, res, next) => {
    try {
        // Extract token from request headers
        const token = req.headers.authorization.split(" ")[1];

        console.log("payment ->")

        // Send request to user management service to authenticate user's role
        const response = await axios.get(`${BASE_URL}/user/authenticate-role/admin`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            httpsAgent: agent,
        });

        // Check if authentication was successful
        if (response.status === 200 && response.data.message === "Admin access granted") {
            next();
        } else {
            res.status(403).json({ message: "Access denied, user does not have ADMIN role" });
        }
    } catch (error) {
        console.error("Error authenticating user role:", error);
        res.status(500).json({ message: "Access denied, user does not have ADMIN role" });
    }
};

module.exports = {
    authenticateadminRole,
    authenticateStudentRole
};

// changes to the code 