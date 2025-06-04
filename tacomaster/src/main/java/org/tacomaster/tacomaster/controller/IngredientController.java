package org.tacomaster.tacomaster.controller;

import org.springframework.web.bind.annotation.*;
import org.tacomaster.tacomaster.model.Ingredient;
import org.tacomaster.tacomaster.service.IngredientService;

import java.util.List;

@RestController
@RequestMapping("/api/ingredients")
@CrossOrigin(origins = "http://localhost:3000")
public class IngredientController {

    private final IngredientService ingredientService;

    public IngredientController(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    @GetMapping
    public List<Ingredient> getAllIngredients() {
        return ingredientService.getAll();
    }
}
