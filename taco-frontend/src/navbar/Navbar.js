import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { useCart } from '../context/CartContext';


const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  return (
      <AppBar position="absolute" elevation={0} sx={{ backgroundColor: 'transparent' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{ color: '#fff', textDecoration: 'none' }}
          >
            TacoMaster 🌮
          </Typography>

          {!user ? (
              <Box>
                <Typography
                    component={Link}
                    to="/login"
                    sx={{ color: '#fff', mr: 2, textDecoration: 'none' }}
                >
                  Zaloguj się
                </Typography>
                <Typography
                    component={Link}
                    to="/register"
                    sx={{ color: '#fff', textDecoration: 'none' }}
                >
                  Zarejestruj się
                </Typography>
              </Box>
          ) : (
              <>
                <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    component={Link}
                    to="/cart"
                    sx={{ color: '#fff', mr: 2 }}
                >
                  <Badge badgeContent={cartItems.length} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>

                <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    onClick={handleMenuOpen}
                    sx={{ color: '#fff' }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => { navigate('/'); handleMenuClose(); }}>
                    Zamów teraz
                  </MenuItem>
                  <MenuItem onClick={() => { navigate('/profile'); handleMenuClose(); }}>
                    Profil
                  </MenuItem>
                  <MenuItem onClick={() => { handleLogout(); handleMenuClose(); }}>
                    Wyloguj się
                  </MenuItem>
                </Menu>
              </>
          )}
        </Toolbar>
      </AppBar>
  );
};

export default Navbar;
