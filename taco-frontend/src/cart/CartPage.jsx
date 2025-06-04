import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import {
  Typography,
  Paper,
  IconButton,
  TextField,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './CartPage.css';
import axios from 'axios';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [step, setStep] = useState(1);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleOrder = async () => {
    try {
     const order = {
    items: cartItems.map(item => ({
        tortilla: item.tortilla,
        meat: item.meat,
        addons: item.addons,
        sauces: item.sauces,
        quantity: item.quantity,
        price: item.price,
    })),
    totalPrice,
    paymentMethod: 'GOTÓWKA',
    pickupLocation: 'TacoMaster, ul. Przykładowa 123',
    userEmail: JSON.parse(localStorage.getItem('user'))?.email || 'anonim',
    };

      await axios.post('http://localhost:8080/api/orders', order);

      alert('Zamówienie złożone!');
      clearCart();
      setStep(1);
    } catch (err) {
      console.error(err);
      alert('Wystąpił błąd przy składaniu zamówienia.');
    }
  };

  return (
    <Paper className="cart-container">
      <Typography variant="h4">Twój koszyk</Typography>

      {step === 1 && (
        <>
          {cartItems.length === 0 ? (
            <p>Koszyk jest pusty.</p>
          ) : (
            <>
              {cartItems.map((item, index) => (
                <div key={index}>
                  <p><strong>Tortilla:</strong> {item.tortilla}</p>
                  <p><strong>Mięso:</strong> {item.meat}</p>
                  <p><strong>Dodatki:</strong> {item.addons?.join(', ')}</p>
                  <p><strong>Sosy:</strong> {item.sauces?.join(', ')}</p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <TextField
                      label="Ilość"
                      type="number"
                      inputProps={{ min: 1 }}
                      value={item.quantity}
                      onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                      size="small"
                    />
                    <IconButton onClick={() => removeFromCart(index)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </div>

                  <p><strong>Cena:</strong> {(item.price * item.quantity).toFixed(2)} zł</p>
                  <hr />
                </div>
              ))}

              <Typography variant="h6">
                Łączna kwota: {totalPrice.toFixed(2)} zł
              </Typography>

              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => setStep(2)}
              >
                Dalej
              </Button>
            </>
          )}
        </>
      )}

      {step === 2 && (
        <>
          <Typography variant="h5" sx={{ mt: 2 }}>Szczegóły odbioru</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>Aktualnie przyjmujemy  zamówienia tylko z dbiorem osobistym</Typography>

          <TextField
            label="Miejsce odbioru"
            value="TacoMaster, ul. Przykładowa 123"
            fullWidth
            disabled
            sx={{ mt: 2 }}
          />

          <TextField
            label="Metoda płatności"
            value="Gotówka przy odbiorze"
            fullWidth
            disabled
            sx={{ mt: 2 }}
          />

          <Button
            variant="contained"
            color="success"
            onClick={handleOrder}
            sx={{ mt: 3 }}
          >
            Złóż zamówienie
          </Button>
        </>
      )}
    </Paper>
  );
};

export default CartPage;
