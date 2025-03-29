const jwt = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
    let token = req.headers.authorization.split(" ")[1];
    token = token.replace(/"/g, '');
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedToken.type === 'admin') {
            next();
        } else {
            res.status(403).json({ message: "Access denied, not an admin" });
        }
    } catch (error) {
        res.status(401).json({ message: "Auth failed!" });
    }
};

const isAdminORInstructor = (req, res, next) => {
    let token = req.headers.authorization.split(" ")[1];
    token = token.replace(/"/g, '');
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedToken.type === 'admin' || decodedToken.type === 'instructor') {
            next();
        } else {
            res.status(403).json({ message: "Access denied, not an admin or instructor" });
        }
    } catch (error) {
        res.status(401).json({ message: "Auth failed!" });
    }
};

const isAdminORStudent = (req, res, next) => {
    let token = req.headers.authorization.split(" ")[1];
    token = token.replace(/"/g, '');
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedToken.type === 'admin' || decodedToken.type === 'student') {
            next();
        } else {
            res.status(403).json({ message: "Access denied, not an admin or student" });
        }
    } catch (error) {
        res.status(401).json({ message: "Auth failed!" });
    }
};
  
const isInstructor = (req, res, next) => {
    let token = req.headers.authorization.split(" ")[1];
    token = token.replace(/"/g, '');
    try {
        console.log("Hekkki");
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedToken.type === 'instructor') {
            next();
        } else {
            res.status(403).json({ message: "Access denied, not an instructor" });
        }
    } catch (error) {
        res.status(401).json({ message: "Auth failed!" });
    }
};

const isInstructorORStudent = (req, res, next) => {
    let token = req.headers.authorization.split(" ")[1];
    token = token.replace(/"/g, '');
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedToken.type === 'instructor' || decodedToken.type === 'student') {
            next();
        } else {
            res.status(403).json({ message: "Access denied, not an instructor or student" });
        }
    } catch (error) {
        res.status(401).json({ message: "Auth failed!" });
    }
};
  
const isStudent = (req, res, next) => {
    let token = req.headers.authorization.split(" ")[1];
    token = token.replace(/"/g, '');
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedToken.type === 'student') {
            next();
        } else {
            res.status(403).json({ message: "Access denied, not a student" });
        }
    } catch (error) {
        res.status(401).json({ message: "Auth failed!" });
    }
};

module.exports = {
    isAdmin,
    isAdminORInstructor,
    isAdminORStudent,
    isInstructor,
    isInstructorORStudent,
    isStudent
}
  