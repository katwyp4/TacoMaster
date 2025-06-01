import React from 'react';
import { useCart } from '../context/CartContext';
import { Typography, Paper } from '@mui/material';

const CartPage = () => {
    const { cartItems } = useCart();

    return (
        <Paper sx={{ p: 4, m: 4 }}>
            <Typography variant="h4">Twój koszyk</Typography>
            {cartItems.length === 0 ? (
                <p>Koszyk jest pusty.</p>
            ) : (
                cartItems.map((item, index) => (
                    <div key={index}>
                        <p><strong>Tortilla:</strong> {item.tortilla}</p>
                        <p><strong>Mięso:</strong> {item.meat}</p>
                        <p><strong>Dodatki:</strong> {item.addons?.join(', ')}</p>
                        <p><strong>Sosy:</strong> {item.sauces?.join(', ')}</p>
                        <p><strong>Cena:</strong> {item.price.toFixed(2)} zł</p>
                        <hr />
                    </div>
                ))
            )}
        </Paper>
    );
};

export default CartPage;
