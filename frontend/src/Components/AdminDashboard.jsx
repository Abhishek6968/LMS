import React, { useState, useEffect } from 'react';
import { Button, TextField, Container, Grid, Card, CardContent, Typography, Select, MenuItem, InputLabel, FormControl, Checkbox, ListItemText, Box } from '@mui/material';
import axios from 'axios';

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [newProject, setNewProject] = useState('');
  const [newMentor, setNewMentor] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    projectTitles: []
  });

  useEffect(() => {
    // Fetching projects
    axios.get('http://localhost:4000/admin/dashboard')
      .then(response => {
        setProjects(response.data.projects);
      })
      .catch(error => console.error(error));

    // Fetching mentors (moving this to the end to display them last)
    axios.get('http://localhost:4000/admin/mentors')
      .then(response => {
        setMentors(response.data.mentors);
      })
      .catch(error => console.error(error));
  }, []);

  const handleAddProject = () => {
    axios.post('http://localhost:4000/admin/project', { title: newProject })
      .then(response => {
        setProjects([...projects, response.data.project]);
        setNewProject('');
      })
      .catch(error => console.error(error));
  };

  const handleAddMentor = () => {
    axios.post('http://localhost:4000/admin/mentor', newMentor)
      .then(response => {
        setMentors([...mentors, response.data.mentor]);
        setNewMentor({
          name: '',
          email: '',
          phone: '',
          password: '',
          projectTitles: []
        });
      })
      .catch(error => console.error(error));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', marginTop: 4 }}>
        Admin Dashboard
      </Typography>

      {/* Add Project Section */}
      <Card sx={{ marginBottom: 4 }}>
        <CardContent>
          <Typography variant="h6">Add New Project</Typography>
          <TextField
            fullWidth
            label="Project Title"
            value={newProject}
            onChange={(e) => setNewProject(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddProject}
            sx={{ width: '100%' }}
          >
            Add Project
          </Button>
        </CardContent>
      </Card>

      {/* Add Mentor Section */}
      <Card sx={{ marginBottom: 4 }}>
        <CardContent>
          <Typography variant="h6">Add New Mentor</Typography>
          <TextField
            fullWidth
            label="Mentor Name"
            value={newMentor.name}
            onChange={(e) => setNewMentor({ ...newMentor, name: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Mentor Email"
            value={newMentor.email}
            onChange={(e) => setNewMentor({ ...newMentor, email: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Mentor Phone"
            value={newMentor.phone}
            onChange={(e) => setNewMentor({ ...newMentor, phone: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Mentor Password"
            type="password"
            value={newMentor.password}
            onChange={(e) => setNewMentor({ ...newMentor, password: e.target.value })}
            sx={{ marginBottom: 2 }}
          />

          {/* Projects Assignment for Mentor */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Assign Projects</InputLabel>
            <Select
              multiple
              value={newMentor.projectTitles}
              onChange={(e) => setNewMentor({ ...newMentor, projectTitles: e.target.value })}
              renderValue={(selected) => selected.join(', ')}
            >
              {projects.map((project) => (
                <MenuItem key={project._id} value={project.title}>
                  <Checkbox checked={newMentor.projectTitles.indexOf(project.title) > -1} />
                  <ListItemText primary={project.title} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddMentor}
            sx={{ width: '100%' }}
          >
            Add Mentor
          </Button>
        </CardContent>
      </Card>

      {/* Projects List */}
      <Typography variant="h6" gutterBottom>
        Projects
      </Typography>
      <Grid container spacing={2}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project._id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6">{project.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Mentors List (Rendered last) */}
      <Typography variant="h6" gutterBottom sx={{ marginTop: 4 }}>
        Mentors
      </Typography>
      <Grid container spacing={2}>
        {mentors.map((mentor) => (
          <Grid item xs={12} sm={6} md={4} key={mentor._id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6">{mentor.name}</Typography>
                <Typography variant="body2" color="textSecondary">{mentor.email}</Typography>
                <Typography variant="body2" color="textSecondary">{mentor.phone}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
