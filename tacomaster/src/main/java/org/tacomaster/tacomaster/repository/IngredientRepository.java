package org.tacomaster.tacomaster.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.tacomaster.tacomaster.model.Ingredient;

import java.util.List;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
    List<Ingredient> findByCategory(Ingredient.Category category);
}
