import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BgImage from "../assets/Regusrer.png"

import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Container, Card, Typography, Box } from '@mui/material';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('User'); 
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                'http://localhost:3001/auth/register',
                { username, password, role },
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              );
              setSuccess('Registration successful! Redirecting to login...');
              setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
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
            <Container maxWidth="sm">
                <Card sx={{ p: 4, width: '100%', maxWidth: 400, textAlign: 'center', boxShadow: 3 }}>
                    <Typography variant="h5" gutterBottom>Register</Typography>
                    {error && <Typography color="error">{error}</Typography>}
                    {success && <Typography color="success.main">{success}</Typography>}
                    <form onSubmit={handleRegister}>
                        <TextField
                            label="Username" fullWidth margin="normal"
                            value={username} onChange={(e) => setUsername(e.target.value)} required
                        />
                        <TextField
                            label="Password" type="password" fullWidth margin="normal"
                            value={password} onChange={(e) => setPassword(e.target.value)} required
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Role</InputLabel>
                            <Select value={role} onChange={(e) => setRole(e.target.value)} required>
                                <MenuItem value="User">User</MenuItem>
                                <MenuItem value="Admin">Admin</MenuItem>
                            </Select>
                        </FormControl>
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            Register
                        </Button>
                    </form>
                    <Typography mt={2}>
                        Already have an account? <a href="/login">Login</a>
                    </Typography>
                </Card>
            </Container>
        </Box>
    );
}

export default Register;
