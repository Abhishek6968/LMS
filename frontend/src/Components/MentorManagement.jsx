import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, List, ListItem, ListItemText, TextField, Button, Box } from '@mui/material';
import axios from 'axios';

const MentorDashboard = () => {
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all students
  useEffect(() => {
    axios.get('http://localhost:4000/mentor/students') // Endpoint for getting all students
      .then(response => {
        setStudents(response.data.students);
      })
      .catch(err => {
        setError('Error fetching students');
      });
  }, []);

  // Handle student addition
  const handleAddStudent = () => {
    if (!studentName || !studentEmail || !selectedProject) {
      setError('Please fill all fields.');
      return;
    }
    setLoading(true);
    const studentData = {
      name: studentName,
      email: studentEmail,
      projectTitle: selectedProject,
    };

    // Call the backend to add student
    axios.post('http://localhost:4000/mentor/add-student', studentData)
      .then(response => {
        setLoading(false);
        setStudentName('');
        setStudentEmail('');
        setSelectedProject('');
        setError('');
        alert('Student added successfully!');
        // Refetch students to show the newly added student
        setStudents([...students, response.data.student]);
      })
      .catch(err => {
        setLoading(false);
        setError('Error adding student');
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', marginTop: 4 }}>
        Mentor Dashboard
      </Typography>

      {/* Add Student Section */}
      <Card sx={{ marginBottom: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6">Add Student</Typography>
          <TextField
            label="Student Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
          <TextField
            label="Student Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={studentEmail}
            onChange={(e) => setStudentEmail(e.target.value)}
          />
          <TextField
            label="Select Project"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          />
          {error && <Typography variant="body2" color="error">{error}</Typography>}
          <Box sx={{ textAlign: 'center', marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddStudent}
              disabled={loading}
            >
              {loading ? 'Adding Student...' : 'Add Student'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* View Students Section */}
      <Card sx={{ boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            All Students
          </Typography>
          {students.length > 0 ? (
            <List>
              {students.map((student, index) => (
                <ListItem key={index}>
                  <ListItemText primary={student.name} secondary={`Email: ${student.email}`} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1" color="textSecondary">
              No students found.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default MentorDashboard;
