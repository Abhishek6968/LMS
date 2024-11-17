// routes/mentorRoutes.js

const express = require('express');
const router = express.Router();
const Student = require('../model/student');

// Add a new student
router.post('/add-student', async (req, res) => {
  try {
    const { name, email } = req.body;

    // Check if the student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ success: false, message: 'Student with this email already exists' });
    }

    // Create student with generated login details (username = email, password = random or a default one)
    const student = new Student({
      name,
      email,
      username: email,  // Assuming email is used as username
      password: 'defaultPassword123', // You can replace this with a more secure password generation method
    });

    await student.save();
    res.status(201).json({ success: true, message: 'Student added', student });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
});

router.get('/studentS', async (req, res) => {
    try {
      // Fetch all students from the database
      const students = await Student.find();
      
      if (students.length === 0) {
        return res.status(404).json({ success: false, message: 'No students found' });
      }
  
      res.status(200).json({ success: true, students });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error });
    }
  });

module.exports = router;
