const axios = require('axios');
const https = require('https');
require('dotenv').config();

const agent = new https.Agent({  
    rejectUnauthorized: false  
  });

const BASE_URL = process.env.BASE_URL || 'http://akslerningplatform.eastus.cloudapp.azure.com';

const authenticateadminRole = async (req, res, next) => {
    try {
        // Extract token from request headers
        const token = req.headers.authorization.split(" ")[1];

        console.log();
        //code change -> check
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

const authenticateadminAndInstructorRole = async (req, res, next) => {
    try {
        // Extract token from request headers
        const token = req.headers.authorization.split(" ")[1];

        // Send request to user management service to authenticate user's role
        const response = await axios.get(`${BASE_URL}/user/authenticate-role/adminAndInstructor`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Check if authentication was successful
        if (response.status === 200 && response.data.message === "Admin and Instructor access granted") {
            next();
        } else {
            res.status(403).json({ message: "Access denied, user does not have roles matching ADMIN and INSTRUCTOR" });
        }
    } catch (error) {
        console.error("Error authenticating user role:", error);
        res.status(500).json({ message: "Access denied, user does not have roles matching ADMIN and INSTRUCTOR" });
    }
};

const authenticateadminAndStudentRole = async (req, res, next) => {
    try {
        // Extract token from request headers
        const token = req.headers.authorization.split(" ")[1];

        // Send request to user management service to authenticate user's role
        const response = await axios.get(`${BASE_URL}/user/authenticate-role/adminAndStudent`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Check if authentication was successful
        if (response.status === 200 && response.data.message === "Admin and Student access granted") {
            next();
        } else {
            res.status(403).json({ message: "Access denied, user does not have roles matching ADMIN and STUDENT" });
        }
    } catch (error) {
        console.error("Error authenticating user role:", error);
        res.status(500).json({ message: "Access denied, user does not have roles matching ADMIN and STUDENT" });
    }
};

const authenticatestudentRole = async (req, res, next) => {
    try {
        // Extract token from request headers
        const token = req.headers.authorization.split(" ")[1];

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
        res.status(500).json({ message: "Access denied, user does not have STUDENT role" });
    }
};

const authenticateinstructorRole = async (req, res, next) => {
    try {
        // Extract token from request headers
        const token = req.headers.authorization.split(" ")[1];

        // Send request to user management service to authenticate user's role
        const response = await axios.get(`${BASE_URL}/user/authenticate-role/instructor`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Check if authentication was successful
        if (response.status === 200 && response.data.message === "Instructor access granted") {
            next();
        } else {
            res.status(403).json({ message: "Access denied, user does not have INSTRUCTOR role" });
        }
    } catch (error) {
        console.error("Error authenticating user role:", error);
        res.status(500).json({ message: "Access denied, user does not have INSTRUCTOR role" });
    }
};

const authenticateinstructorAndStudentRole = async (req, res, next) => {
    try {
        // Extract token from request headers
        const token = req.headers.authorization.split(" ")[1];

        // Send request to user management service to authenticate user's role
        const response = await axios.get(`${BASE_URL}/user/authenticate-role/instructorAndStudent`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Check if authentication was successful
        if (response.status === 200 && response.data.message === "Instructor and Student access granted") {
            console.log("granted")
            next();
        } else {
            res.status(403).json({ message: "Access denied, user does not have roles matching INSTRUCTOR and STUDENT" });
        }
    } catch (error) {
        // console.error("Error authenticating user role:", error);
        res.status(500).json({ message: "Access denied, user does not have roles matching INSTRUCTOR and STUDENT" });
    }
};

module.exports = {
    authenticateadminRole,
    authenticateadminAndInstructorRole,
    authenticateadminAndStudentRole,
    authenticatestudentRole,
    authenticateinstructorRole,
    authenticateinstructorAndStudentRole,
};




