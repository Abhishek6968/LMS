const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,  // Ensures that emails are unique
      trim: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',  // Reference to the Project model
    },
    // You can add more fields as necessary
    isActive: {
      type: Boolean,
      default: true, // Flag to track if the student is active
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
