import React, { useEffect, createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
    });


    const addToCart = (item) => {
    setCartItems(prev => [...prev, { ...item, quantity: 1 }]);
    };


    const removeFromCart = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
    };

    const updateQuantity = (index, quantity) => {
    setCartItems(prev => {
    const updated = [...prev];
    updated[index].quantity = quantity;
    return updated;
     });
    };


    const clearCart = () => setCartItems([]);

    useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);


    return (
        <CartContext.Provider value={{ cartItems, addToCart, clearCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
