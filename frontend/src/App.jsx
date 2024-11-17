import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import MentorDashboard from './Components/MentorManagement';
import AdminDashboard from './Components/AdminDashboard';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/mentor" element={<MentorDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
