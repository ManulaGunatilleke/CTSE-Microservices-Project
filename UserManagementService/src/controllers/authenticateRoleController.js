const authenticateRoleController = {

    // Controller method for admin role
    adminRole: (req, res) => {
        res.status(200).json({ message: "Admin access granted" });
    },

    // Controller method for admin and instructor role
    adminAndInstructorRole: (req, res) => {
        res.status(200).json({ message: "Admin and Instructor access granted" });
    },

    // Controller method for admin and student role
    adminAndStudentRole: (req, res) => {
        res.status(200).json({ message: "Admin and Student access granted" });
    },

    // Controller method for instructor role
    instructorRole: (req, res) => {
        res.status(200).json({ message: "Instructor access granted" });
    },

    // Controller method for admin and instructor role
    InstructorAndStudentRole: (req, res) => {
        res.status(200).json({ message: "Instructor and Student access granted" });
    },

    // Controller method for student role
    studentRole: (req, res) => {
        res.status(200).json({ message: "Student access granted" });
    }
};

module.exports = authenticateRoleController;
