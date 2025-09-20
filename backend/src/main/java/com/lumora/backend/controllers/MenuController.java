package com.lumora.backend.controllers;

import com.lumora.backend.dto.LocalizedDishResponse;
import com.lumora.backend.models.Dish;
import com.lumora.backend.repository.DishRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

// Controller REST per la gestione del menu del ristorante
@RestController
@RequestMapping("/api/menu")
public class MenuController {

    @Autowired
    private DishRepository dishRepository;

    @GetMapping
    public List<LocalizedDishResponse> getAllDishes(@RequestParam(defaultValue = "en") String lang) {
        return dishRepository.findAll().stream()
            .map(dish -> new LocalizedDishResponse(
                dish.getId(),
                dish.getType(),
                dish.getName(lang),
                dish.getPrice()
            ))
            .collect(Collectors.toList());
    }

    /*
     * Recupera tutti i piatti in formato originale (senza localizzazione)
     * Utilizzato per operazioni di sistema
     */
    @GetMapping("/raw")
    public List<Dish> getAllDishesRaw() {
        return dishRepository.findAll();
    }
}
