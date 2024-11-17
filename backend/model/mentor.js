const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    referenceMaterials: [{ type: String }]
});
const mentor= mongoose.model('Mentor', mentorSchema);

module.exports =mentor
