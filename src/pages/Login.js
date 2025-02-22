import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import BgImage from "../assets/login_BG.jpg"
import { TextField, Button, Card, CardContent, Typography, Box } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/login',
       { username, password });

      Cookies.set('token', response.data.token, { expires: 1 }); 
      
      if(response.data.role==='Admin'){
        navigate('/dashboard');
      }else{
        navigate('/userdashboard');
      }
    
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${BgImage})`,   
      backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Card sx={{ width: 600, padding: 3, boxShadow: 5, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" gutterBottom>
            Login
          </Typography>

          {error && <Typography color="error" textAlign="center">{error}</Typography>}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <TextField 
              label="Username" 
              variant="outlined" 
              fullWidth 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
            <TextField 
              label="Password" 
              type="password" 
              variant="outlined" 
              fullWidth 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth 
              sx={{ mt: 2, fontWeight: 'bold' }}
            >
              Login 
            </Button>
             <Typography mt={2}>Don't have an account? <a href="/register">Sign Up</a></Typography>
          
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
