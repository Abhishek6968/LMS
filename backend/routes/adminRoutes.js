// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const Project = require('../model/project');
const Mentor = require('../model/mentor');
const app=express();
app.use(express.json());


// Controller to get admin dashboard
const getAdminDashboard = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json({ success: true, projects });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};

// Controller to add a project topic
const addProjectTopic = async (req, res) => {
    try {
        const { title } = req.body;
        const newProject = new Project({ title });
        await newProject.save();
        res.status(201).json({ success: true, message: 'Project topic added', project: newProject });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};

// Controller to edit a project topic
const editProjectTopic = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { title } = req.body;
        const project = await Project.findByIdAndUpdate(projectId, { title }, { new: true });
        res.status(200).json({ success: true, message: 'Project topic updated', project });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};

// Controller to delete a project topic
const deleteProjectTopic = async (req, res) => {
    try {
        const { projectId } = req.params;
        await Project.findByIdAndDelete(projectId);
        res.status(200).json({ success: true, message: 'Project topic deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};


const addMentor = async (req, res) => {
    try {
        const { name, email, phone, password, projectTitles } = req.body;

        // Convert project titles to ObjectIds
        const projects = await Project.find({ title: { $in: projectTitles } });
        console.log('Project titles in request:', projectTitles);
        console.log('Matching projects from DB:', projects);
        
        if (!projects.length) {
            return res.status(404).json({ success: false, message: 'No projects found with the given titles' });
        }

        const projectIds = projects.map(project => project._id);

        const newMentor = new Mentor({ name, email, phone, password, projects: projectIds });
        await newMentor.save();

        res.status(201).json({ success: true, message: 'Mentor added', mentor: newMentor });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};


// Controller to update mentor details
const updateMentor = async (req, res) => {
    try {
        const { mentorId } = req.params;
        const updatedMentor = await Mentor.findByIdAndUpdate(mentorId, req.body, { new: true });
        res.status(200).json({ success: true, message: 'Mentor details updated', mentor: updatedMentor });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};

// Controller to delete a mentor
const deleteMentor = async (req, res) => {
    try {
        const { mentorId } = req.params;
        await Mentor.findByIdAndDelete(mentorId);
        res.status(200).json({ success: true, message: 'Mentor deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};
const getAllMentors = async (req, res) => {
    try {
        const mentors = await Mentor.find(); // Fetch all mentors from the Mentor model
        res.status(200).json({ success: true, mentors });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};
// Route definitions

// Route to get admin dashboard
router.get('/dashboard', getAdminDashboard);
// Route to add a project topic
router.post('/project', addProjectTopic);
// Route to edit a project topic
router.put('/project/:projectId', editProjectTopic);
// Route to delete a project topic
router.delete('/project/:projectId', deleteProjectTopic);
// Route to add a mentor
router.post('/mentor', addMentor);
// Route to update mentor details
router.put('/mentor/:mentorId', updateMentor);
// Route to delete a mentor
router.delete('/mentor/:mentorId', deleteMentor);
router.get('/mentors', getAllMentors);


module.exports = router;
