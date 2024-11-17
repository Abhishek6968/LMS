const express = require('express');
const admin = require('../model/admin');  // Admin model
const mentor = require('../model/mentor');  // Mentor model
const router = express.Router();

// Admin login route
const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the admin by email
        const adminUser = await admin.findOne({ email });
        if (!adminUser) {
            return res.status(400).json({ success: false, message: 'Admin not found' });
        }

        // Check if the password matches (plain text comparison)
        if (adminUser.password !== password) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Admin authenticated successfully
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            role: 'admin',
            user: { email: adminUser.email, role: 'admin' }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};

// Mentor login route
const mentorLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the mentor by email
        const mentorUser = await mentor.findOne({ email });
        if (!mentorUser) {
            return res.status(400).json({ success: false, message: 'Mentor not found' });
        }

        // Check if the password matches (plain text comparison)
        if (mentorUser.password !== password) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Mentor authenticated successfully
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            role: 'mentor',
            user: { name: mentorUser.name, email: mentorUser.email, role: 'mentor' }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};

// Define routes
router.post('/adminLogin', adminLogin);  // Admin login route
router.post('/mentorLogin', mentorLogin);  // Mentor login route

module.exports = router;
