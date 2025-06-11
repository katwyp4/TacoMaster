import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import './RegisterForm.css';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ email: '', username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');  
  const navigate = useNavigate();

  const handleChange = e => {
    setErrorMessage('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
  e.preventDefault();
  try {
    await axios.post('http://localhost:8080/api/users/register', formData);
    alert('Zarejestrowano!');
    navigate('/login');
  } catch (err) {
    console.error("Błąd backendu:", err.response?.data);
    if (err.response && err.response.data) {
      if (Array.isArray(err.response.data) && err.response.data.length > 0) {
        setErrorMessage(err.response.data[0].defaultMessage || "Błąd rejestracji");
      } else if (err.response.data.error) {
        setErrorMessage(err.response.data.error);
      } else {
        setErrorMessage("Błąd rejestracji");
      }
    } else {
      setErrorMessage("Błąd rejestracji");
    }
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
        {errorMessage && (
          <Typography color="error" sx={{ mt: 1 }}>
            {errorMessage}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default RegisterForm;
