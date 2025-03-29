const Admin = require('../models/admin');
const Student = require('../models/student');
const Instructor = require('../models/instructor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Checking whether the same email has been used in each userType
const checkEmailExists = async (email) => {
  const admin = await Admin.findOne({ Email: email });
  const student = await Student.findOne({ Email: email });
  const instructor = await Instructor.findOne({ Email: email });

  return admin || student || instructor;
};

// Create an admin account
const adminRegister = async (req, res) => {
  try {
    const { Adminname, Email, Password } = req.body;
    const existingEmail = await checkEmailExists(Email);

    if (!existingEmail) {
      const hashPassword = await bcrypt.hash(Password, 10);

      const admin = new Admin({
        Adminname,
        Email,
        Password: hashPassword,
      });

      const token = jwt.sign({ _id: admin._id }, 'secretkey123', {
        expiresIn: '60d',
      });

      await admin.save();
      res.json({ message: 'Admin registration successful', token });
    } else {
      res.json({ message: 'This email is already exists' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Admin registration failed' });
  }
}

// Registering a new student
const registerStudent = async (req, res) => {
  try {
    const { Fullname, Email, Password } = req.body;
    const existingEmail = await checkEmailExists(Email);

    if (!existingEmail) {
      const hashPassword = await bcrypt.hash(Password, 10);

      const student = new Student({
        Fullname,
        Email,
        Password: hashPassword,
      });

      const token = jwt.sign({ _id: student._id }, 'secretkey123', {
        expiresIn: '60d',
      });

      await student.save();
      res.json({ message: 'Student registration successful', token });
    } else {
      res.json({ message: 'This email is already exists' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Student registration failed' });
  }
}

// Registering a new instructor
const registerInstructor = async (req, res) => {
  try {
    const { Instructorname, Email, Password } = req.body;
    const existingEmail = await checkEmailExists(Email);

    if (!existingEmail) {
      const hashPassword = await bcrypt.hash(Password, 10);

      const instructor = new Instructor({
        Instructorname,
        Email,
        Password: hashPassword,
      });

      const token = jwt.sign({ _id: instructor._id }, 'secretkey123', {
        expiresIn: '60d',
      });

      await instructor.save();
      res.json({ message: 'Instructor registration successful', token });
    } else {
      res.json({ message: 'This email is already exists' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Instructor registration failed' });
  }
}

// Login Part base on the Type
const loginUser = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    let user;
    let loginmessage;
    let type;

    const admin = await Admin.findOne({ Email });
    if (admin) {
      user = admin;
      loginmessage = "Admin logging successfully...!";
      type = 'admin';
    } else {
      const instructor = await Instructor.findOne({ Email });
      if (instructor) {
        user = instructor;
        loginmessage = "Instructor logging successfully...!";
        type = 'instructor';
      } else {
        const normalstudent = await Student.findOne({ Email });
        if (normalstudent) {
          user = normalstudent;
          loginmessage = "Student logging successfully...!";
          type = 'student';
        } else {
          return res.status(404).json({ error: "Email not found" });
        }
      }
    }

    const passwordMatch = await bcrypt.compare(Password, user.Password);
    if (passwordMatch) {
      const token = jwt.sign({ email: user.Email, type: user.Type }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ message: loginmessage, token, user, type });
    } else {
      return res.status(401).json({ error: "Password incorrect" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Validate token controller function
const validateToken = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }


  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    res.status(200).json({
      user: {
        Email: decoded.Email,
        Fullname: decoded.Fullname,
        Type: decoded.Type,
        _id: decoded._id
      },
      token
    });
  });
}

module.exports = {
  adminRegister,
  registerStudent,
  registerInstructor,
  loginUser,
  validateToken
};