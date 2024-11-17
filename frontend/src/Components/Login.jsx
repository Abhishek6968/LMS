import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); // To store the role (admin or mentor)
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset any previous error

    try {
      let loginUrl = '';
      if (role === 'admin') {
        loginUrl = 'http://localhost:4000/api/auth/adminLogin'; // Admin login route
      } else if (role === 'mentor') {
        loginUrl = 'http://localhost:4000/api/auth/mentorLogin'; // Mentor login route
      } else {
        setError('Please select a role: Admin or Mentor');
        return;
      }

      // Send login request to the correct route based on the role
      const response = await axios.post(loginUrl, { email, password });

      if (response.data.success) {
        // Navigate to the respective dashboard based on the role
        if (response.data.role === 'admin') {
          navigate('/admin', { state: response.data }); // Pass user details to admin dashboard
        } else if (response.data.role === 'mentor') {
          navigate('/mentor'); // Pass user details to mentor dashboard
        }
      } else {
        setError(response.data.message || 'Invalid credentials');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 10 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
          Login
        </Typography>
        {error && <Typography color="error" variant="body2" align="center">{error}</Typography>}
        
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <div>
            {/* Role selection */}
            <label>
              <input
                type="radio"
                name="role"
                value="admin"
                onChange={() => setRole('admin')}
                checked={role === 'admin'}
              />
              Admin
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="mentor"
                onChange={() => setRole('mentor')}
                checked={role === 'mentor'}
              />
              Mentor
            </label>
          </div>
          <Button variant="contained" color="primary" type="submit" sx={{ width: '100%' }}>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
