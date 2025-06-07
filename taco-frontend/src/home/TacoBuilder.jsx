import React, { useState, useEffect } from 'react';
import './TacoBuilder.css';
import { Button, Checkbox, FormControlLabel, Typography, Box, Radio } from '@mui/material';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const TacoBuilder = () => {
  const [ingredients, setIngredients] = useState([]);
  const [step, setStep] = useState(0);

  // Wybrane składniki
  const [selectedTortilla, setSelectedTortilla] = useState('');
  const [selectedMeat, setSelectedMeat] = useState('');
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [selectedSauces, setSelectedSauces] = useState([]);
  const [total, setTotal] = useState(0);

  const { addToCart } = useCart();

  // Pobierz składniki z backendu
  useEffect(() => {
    axios.get('http://localhost:8080/api/ingredients')
      .then(res => setIngredients(res.data))
      .catch(err => console.error(err));
  }, []);

  // Kategoryzacja składników
  const categorized = { TORTILLA: [], MIESO: [], DODATEK: [], SOS: [] };
  ingredients.forEach(item => {
    categorized[item.category]?.push(item);
  });

  // Przelicz cenę ZAWSZE gdy zmienisz wybór
  useEffect(() => {
    let sum = 0;
    if (selectedTortilla) {
      const tortilla = ingredients.find(i => i.category === 'TORTILLA' && i.name === selectedTortilla);
      sum += tortilla ? tortilla.price : 0;
    }
    if (selectedMeat) {
      const meat = ingredients.find(i => i.category === 'MIESO' && i.name === selectedMeat);
      sum += meat ? meat.price : 0;
    }
    selectedAddons.forEach(name => {
      const addon = ingredients.find(i => i.category === 'DODATEK' && i.name === name);
      sum += addon ? addon.price : 0;
    });
    selectedSauces.forEach(name => {
      const sauce = ingredients.find(i => i.category === 'SOS' && i.name === name);
      sum += sauce ? sauce.price : 0;
    });
    setTotal(sum);
  }, [selectedTortilla, selectedMeat, selectedAddons, selectedSauces, ingredients]);

  const steps = [
    { label: 'Wybierz tortillę', options: categorized.TORTILLA || [] },
    { label: 'Wybierz mięso', options: categorized.MIESO || [] },
    { label: 'Wybierz dodatki', options: categorized.DODATEK || [] },
    { label: 'Wybierz sosy', options: categorized.SOS || [] }
  ];

  const canProceed =
    (step === 0 && !!selectedTortilla) ||
    (step === 1 && !!selectedMeat) ||
    (step > 1 && steps[step].options.length > 0);

  const handleAddonChange = (name) => {
    setSelectedAddons(prev =>
      prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]
    );
  };
  const handleSauceChange = (name) => {
    setSelectedSauces(prev =>
      prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]
    );
  };

  return (
    <Box className="taco-builder">
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        Stwórz swoje taco 🌮
      </Typography>

      <Typography variant="h5" className="step-title">{steps[step].label}</Typography>
      <div className="options-list">
        {steps[step] && steps[step].options.map(option => {
          if (step === 0) {
            return (
              <FormControlLabel
                key={option.name}
                control={
                  <Radio
                    checked={selectedTortilla === option.name}
                    onChange={() => setSelectedTortilla(option.name)}
                    sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }}
                  />
                }
                label={`${option.name} (+${option.price} zł)`}
                sx={{ color: '#fff' }}
              />
            );
          }
          if (step === 1) {
            return (
              <FormControlLabel
                key={option.name}
                control={
                  <Radio
                    checked={selectedMeat === option.name}
                    onChange={() => setSelectedMeat(option.name)}
                    sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }}
                  />
                }
                label={`${option.name} (+${option.price} zł)`}
                sx={{ color: '#fff' }}
              />
            );
          }
          if (step === 2) {
            return (
              <FormControlLabel
                key={option.name}
                control={
                  <Checkbox
                    checked={selectedAddons.includes(option.name)}
                    onChange={() => handleAddonChange(option.name)}
                    sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }}
                  />
                }
                label={`${option.name} (+${option.price} zł)`}
                sx={{ color: '#fff' }}
              />
            );
          }
          if (step === 3) {
            return (
              <FormControlLabel
                key={option.name}
                control={
                  <Checkbox
                    checked={selectedSauces.includes(option.name)}
                    onChange={() => handleSauceChange(option.name)}
                    sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }}
                  />
                }
                label={`${option.name} (+${option.price} zł)`}
                sx={{ color: '#fff' }}
              />
            );
          }
          return null;
        })}
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
              disabled={!selectedTortilla || !selectedMeat}
              onClick={() => {
                const taco = {
                  tortilla: selectedTortilla,
                  meat: selectedMeat,
                  addons: selectedAddons,
                  sauces: selectedSauces,
                  price: total,
                };
                addToCart(taco);
                setSelectedTortilla('');
                setSelectedMeat('');
                setSelectedAddons([]);
                setSelectedSauces([]);
                setTotal(0);
                setStep(0);

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
