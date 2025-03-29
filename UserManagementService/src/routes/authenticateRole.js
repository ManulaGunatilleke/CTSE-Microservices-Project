const express = require("express");
const router = express.Router();
const authenticateRoleController = require('../controllers/authenticateRoleController');
const {isAdmin, isAdminORInstructor, isAdminORStudent, isInstructor, isInstructorORStudent, isStudent } = require('../middleware/authenticateRoleBase');

router.get('/admin', isAdmin, authenticateRoleController.adminRole);
router.get('/adminAndInstructor', isAdminORInstructor, authenticateRoleController.adminAndInstructorRole);
router.get('/adminAndStudent', isAdminORStudent, authenticateRoleController.adminAndStudentRole);
router.get('/instructor', isInstructor, authenticateRoleController.instructorRole);
router.get('/instructorAndStudent', isInstructorORStudent, authenticateRoleController.InstructorAndStudentRole);
router.get('/student', isStudent, authenticateRoleController.studentRole);

module.exports = router;
