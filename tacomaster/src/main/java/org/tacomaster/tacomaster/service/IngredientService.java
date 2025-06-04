package org.tacomaster.tacomaster.service;

import org.springframework.stereotype.Service;
import org.tacomaster.tacomaster.model.Ingredient;
import org.tacomaster.tacomaster.repository.IngredientRepository;

import java.util.List;

@Service
public class IngredientService {
    private final IngredientRepository ingredientRepository;

    public IngredientService(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    public List<Ingredient> getAll() {
        return ingredientRepository.findAll();
    }

    public List<Ingredient> getByCategory(Ingredient.Category category) {
        return ingredientRepository.findByCategory(category);
    }
}
