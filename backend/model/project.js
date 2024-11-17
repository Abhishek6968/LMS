const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    submissions: [{
        studentName: { type: String, required: true },
        submissionDate: { type: Date, default: Date.now },
        content: { type: String, required: true },
        status: { type: String, enum: ['Completed', 'Pending'], default: 'Pending' },
        marks: { type: Number },
        comments: { type: String }
    }],
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' }
});

const project= mongoose.model('Project', projectSchema);
module.exports =project;
