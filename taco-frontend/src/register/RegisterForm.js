import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import './RegisterForm.css';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ email: '', username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/users/register', formData);

      alert('Zarejestrowano!');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Błąd rejestracji');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Rejestracja
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Email" name="email" value={formData.email} onChange={handleChange} required />
        <TextField label="Nazwa użytkownika" name="username" value={formData.username} onChange={handleChange} required />
        <TextField label="Hasło" type="password" name="password" value={formData.password} onChange={handleChange} required />
        <Button type="submit" variant="contained">Zarejestruj</Button>
      </Box>
    </Paper>
  );
};

export default RegisterForm;
