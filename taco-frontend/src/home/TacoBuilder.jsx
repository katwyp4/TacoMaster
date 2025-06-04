import React, { useState } from 'react';
import './TacoBuilder.css';
import { Button, Checkbox, FormControlLabel, Typography, Box } from '@mui/material';
import { useCart } from '../context/CartContext';

import { useEffect } from 'react';
import axios from 'axios';

const TacoBuilder = () => {

    const [ingredients, setIngredients] = useState([]);
    const [step, setStep] = useState(0);
    const [selected, setSelected] = useState({});
    const [total, setTotal] = useState(0);
    const { addToCart } = useCart();
    const toggleOption = (option) => {
        const key = `${step}-${option.name}`;
        const isSelected = selected[key];
        const newSelected = { ...selected, [key]: !isSelected };
        setSelected(newSelected);
        setTotal(total + (isSelected ? -option.price : option.price));
    };

    const categorized = {TORTILLA: [], MIESO: [], DODATEK: [], SOS: [] };

    ingredients.forEach(item => {
    categorized[item.category]?.push(item);
    });


    const steps = [
    { label: 'Wybierz tortillę', options: categorized.TORTILLA || [] },
    { label: 'Wybierz mięso', options: categorized.MIESO || [] },
    { label: 'Wybierz dodatki', options: categorized.DODATEK || [] },
    { label: 'Wybierz sosy', options: categorized.SOS || [] }
    ];

    const tortilla = Object.entries(selected)
    .filter(([k, v]) => v && k.startsWith('0-'))
    .map(([k]) => k.split('-')[1])[0] || '';

    const meat = Object.entries(selected)
    .filter(([k, v]) => v && k.startsWith('1-'))
    .map(([k]) => k.split('-')[1])[0] || '';

    const addons = Object.entries(selected)
    .filter(([k, v]) => v && k.startsWith('2-'))
    .map(([k]) => k.split('-')[1]);

    const sauces = Object.entries(selected)
    .filter(([k, v]) => v && k.startsWith('3-'))
    .map(([k]) => k.split('-')[1]);


    const canProceed = steps[step].options.some(option =>
        selected[`${step}-${option.name}`]
    );

    useEffect(() => {
  axios.get('http://localhost:8080/api/ingredients')
    .then(res => setIngredients(res.data))
    .catch(err => console.error(err));
}, []);

    return (
        <Box className="taco-builder">
            <Typography variant="h4" align="center" sx={{ mb: 4 }}>
                Stwórz swoje taco 🌮
            </Typography>

            <Typography variant="h5" className="step-title">{steps[step].label}</Typography>

            <div className="options-list">
                {steps[step] &&steps[step].options.map(option => (
                    <FormControlLabel
                        key={option.name}
                        control={
                            <Checkbox
                                checked={!!selected[`${step}-${option.name}`]}
                                onChange={() => toggleOption(option)}
                                sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }}
                            />

                        }
                        label={`${option.name} (+${option.price} zł)`}
                        sx={{ color: '#fff' }}
                    />
                ))}
            </div>

            <div className="builder-footer">
                <Typography variant="h6">Cena: {total.toFixed(2)} zł</Typography>

                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                    {step > 0 && (
                        <Button
                            variant="outlined"
                            onClick={() => setStep(step - 1)}
                            sx={{
                                backgroundColor: '#fff',
                                color: '#000',
                                borderColor: '#fff',
                                '&:hover': {
                                    backgroundColor: '#e0e0e0',
                                    borderColor: '#fff',
                                },
                            }}
                        >
                            Wstecz
                        </Button>

                    )}
                    {step < steps.length - 1 ? (
                        <Button
                            variant="contained"
                            onClick={() => setStep(step + 1)}
                            disabled={!canProceed}
                            sx={{
                                backgroundColor: '#fff',
                                color: '#000',
                                '&:hover': {
                                    backgroundColor: '#e0e0e0',
                                },
                            }}
                        >
                            Dalej
                        </Button>

                    ) : (
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => {
                                const selectedOptions = Object.entries(selected)
                                    .filter(([, v]) => v)
                                    .map(([k]) => k.split('-')[1]);

                                const taco = {
                                    tortilla,
                                    meat,
                                    addons,
                                    sauces,
                                    price: total,
                                    };
                                addToCart(taco);
                                setSelected({});
                                setStep(0);
                                setTotal(0);

                                alert("Dodano do koszyka! 🍽");
                               
                            }}
                        >
                            Dodaj do koszyka
                        </Button>
                    )}
                </Box>
            </div>
        </Box>
    );

};

export default TacoBuilder;
