import React, {  useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import {  Box, CssBaseline, Typography, Button,} from '@mui/material';
import BgImage from '../assets/UserDashboard.jpg'; // Import a background image


const Dashboard = () => {
  const [message, setMessage] = useState('Welcome to User Dashboard');
  const navigate = useNavigate();



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
