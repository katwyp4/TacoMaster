import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

 const handleSubmit = async e => {
  e.preventDefault();
  try {
    const res = await axios.post(
      'http://localhost:8080/api/users/login',
      formData,
      { withCredentials: true }
    );
  
    const user = res.data;
    localStorage.setItem('user', JSON.stringify(user));
    
    if (user.role === 'ADMIN') navigate('/admin');
    else                    navigate('/');
    
  } catch (err) {
    console.error(err);
    alert('Błąd logowania: ' + (err.response?.data?.message || err.message));
  }
};

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Logowanie
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Email" name="email" value={formData.email} onChange={handleChange} required />
        <TextField label="Hasło" type="password" name="password" value={formData.password} onChange={handleChange} required />
        <Button type="submit" variant="contained">Zaloguj</Button>
      </Box>
    </Paper>
  );
};

export default LoginForm;
