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

    public Ingredient saveIngredient(Ingredient ingredient) {
        return ingredientRepository.save(ingredient);
    }

    public Ingredient updateIngredient(Long id, Ingredient updatedIngredient) {
        Ingredient existing = ingredientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ingredient not found"));
        existing.setName(updatedIngredient.getName());
        existing.setPrice(updatedIngredient.getPrice());
        existing.setCategory(updatedIngredient.getCategory());
        return ingredientRepository.save(existing);
    }

    public void deleteIngredient(Long id) {
        ingredientRepository.deleteById(id);
    }
}
