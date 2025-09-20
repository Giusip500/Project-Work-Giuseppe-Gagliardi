package com.lumora.backend.controllers;

import com.lumora.backend.dto.CustomMenuConfirmRequest;
import com.lumora.backend.dto.CustomMenuRequest;
import com.lumora.backend.dto.CustomMenuResponse;
import com.lumora.backend.dto.LocalizedDishResponse;
import com.lumora.backend.models.CustomMenu;
import com.lumora.backend.models.Dish;
import com.lumora.backend.models.User;
import com.lumora.backend.repository.DishRepository;
import com.lumora.backend.repository.UserRepository;
import com.lumora.backend.services.CustomMenuService;
import com.lumora.backend.services.MessageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

// Controller REST per la gestione dei menu personalizzati
@RestController
@RequestMapping("/api/custom-menu")
public class CustomMenuController {

    @Autowired
    private CustomMenuService customMenuService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DishRepository dishRepository;

    @Autowired
    private MessageService messageService;

    @PostMapping("/generate")
    public ResponseEntity<CustomMenuResponse> generateMenu(@RequestBody CustomMenuRequest request, @RequestParam(defaultValue = "en") String lang) {
        List<Dish> menu = customMenuService.generateCustomMenu(request, lang);

        // Converte i piatti in formato localizzato per la risposta
        List<LocalizedDishResponse> localizedMenu = menu.stream()
            .map(dish -> new LocalizedDishResponse(
                dish.getId(),
                dish.getType(),
                dish.getName(lang),
                dish.getPrice()))
            .collect(Collectors.toList());

        return ResponseEntity.ok(new CustomMenuResponse(localizedMenu));
    }

    @PostMapping("/confirm")
    public ResponseEntity<?> confirmMenu(@RequestBody CustomMenuConfirmRequest request, @RequestParam(defaultValue = "en") String lang) {
        try {
            User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
            List<Dish> dishes = dishRepository.findAllById(request.getDishIds());
            // Crea nuovo menu personalizzato
            CustomMenu menu = new CustomMenu();
            menu.setDate(request.getDate());
            menu.setType(request.getType());
            menu.setUser(user);
            menu.setDishes(dishes);
            // Salva menu e invia email di conferma
            customMenuService.saveConfirmedMenu(menu, lang);

            return ResponseEntity.ok(Map.of("message", messageService.getMessage("menu.confirmed", lang)));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", messageService.getMessage("user.notFound", lang)));
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getMenusByUser(@PathVariable Long userId, @RequestParam(defaultValue = "en") String lang) {
        try {
            User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

            List<CustomMenu> menus = customMenuService.getMenusByUser(user);
            return ResponseEntity.ok(menus);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                "error", messageService.getMessage("user.notFound", lang)
            ));
        }
    }

    @GetMapping("/admin")
    public ResponseEntity<List<CustomMenu>> getAllCustomMenus(@RequestParam(required = false) String date, @RequestParam(required = false) String type) {
        List<CustomMenu> menus = customMenuService.getFilteredMenus(date, type);
        return ResponseEntity.ok(menus);
    }
}
