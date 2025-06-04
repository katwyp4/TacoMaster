import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './home/HomePage';
import ProfilePage from './profile/ProfilePage';
import LoginForm from './login/LoginForm';
import RegisterForm from './register/RegisterForm';
import Navbar from './navbar/Navbar';
import { CssBaseline, Container } from '@mui/material';
import './App.css';
import './index.css'
import { CartProvider } from './context/CartContext';
import CartPage from './cart/CartPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <CssBaseline />
        <Navbar />

        <div className="app-wrapper">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/profile" element={<ProfilePage />} />
              <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </Router>
      </CartProvider>
  );
}


export default App;
