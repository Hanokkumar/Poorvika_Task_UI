import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import {  Box, CssBaseline, Typography, Button, } from '@mui/material';
import BgImage from '../assets/AdminDashboard.webp'; 



const Dashboard = () => {
  const [message, setMessage] = useState('Welcome to Dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get('http://localhost:3001/admin', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setMessage(res.data.message))
      .catch(() => {
        Cookies.remove('token');
        navigate('/login');
      });
  }, [navigate]);

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundImage: `url(${BgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <CssBaseline />
      
  
      <Box component="main" sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h4" gutterBottom>{message}</Typography>
        <Button variant="contained" color="error" onClick={handleLogout} sx={{ mt: 2 }}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
