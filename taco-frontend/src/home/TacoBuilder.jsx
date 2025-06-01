import React, { useState } from 'react';
import './TacoBuilder.css';
import { Button, Checkbox, FormControlLabel, Typography, Box } from '@mui/material';
import { useCart } from '../context/CartContext';



const steps = [
    {
        label: 'Wybierz tortillę',
        options: [
            { name: 'Pszenna', price: 2 },
            { name: 'Kukurydziana', price: 2.5 },
        ],
    },
    {
        label: 'Wybierz mięso',
        options: [
            { name: 'Wołowina', price: 6 },
            { name: 'Kurczak', price: 5 },
            { name: 'Tofu', price: 4 },
        ],
    },
    {
        label: 'Wybierz dodatki',
        options: [
            { name: 'Sałata', price: 1 },
            { name: 'Pomidory', price: 1 },
            { name: 'Ser', price: 1.5 },
            { name: 'Czerwona cebula', price: 1 },
        ],
    },
    {
        label: 'Wybierz sosy',
        options: [
            { name: 'Sos łagodny', price: 1 },
            { name: 'Sos ostry', price: 1 },
            { name: 'Guacamole', price: 2 },
        ],
    },
];

const TacoBuilder = () => {
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

    const canProceed = steps[step].options.some(option =>
        selected[`${step}-${option.name}`]
    );

    return (
        <Box className="taco-builder">
            <Typography variant="h4" align="center" sx={{ mb: 4 }}>
                Stwórz swoje taco 🌮
            </Typography>

            <Typography variant="h5" className="step-title">{steps[step].label}</Typography>

            <div className="options-list">
                {steps[step].options.map(option => (
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
                    {/* Wstecz */}
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

                    {/* Dalej lub Dodaj do koszyka */}
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
                                    ingredients: selectedOptions,
                                    price: total,
                                };

                                // użyj kontekstu do dodania
                                alert("Dodano do koszyka! 🍽");
                                // addToCart(taco); <- wstaw jak masz kontekst
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
