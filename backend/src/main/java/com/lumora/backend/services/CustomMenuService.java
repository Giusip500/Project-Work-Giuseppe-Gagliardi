package com.lumora.backend.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lumora.backend.dto.CustomMenuRequest;
import com.lumora.backend.models.CustomMenu;
import com.lumora.backend.models.Dish;
import com.lumora.backend.models.User;
import com.lumora.backend.repository.CustomMenuRepository;
import com.lumora.backend.repository.DishRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
public class CustomMenuService {

    @Autowired
    private CustomMenuRepository customMenuRepository;

    @Autowired
    private DishRepository dishRepository;

    @Autowired
    private EmailService emailService;

    private final WebClient webClient;

    // URL dell'API di OpenRouter per le chat completions
    private static final String OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

    public CustomMenuService(@Value("${openrouter.api.key}") String openRouterApiKey) {
        this.webClient = WebClient.builder()
            .baseUrl(OPENROUTER_URL)
            // Configurazione headers per l'autenticazione e il formato
            .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + openRouterApiKey)
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .defaultHeader(HttpHeaders.USER_AGENT, "Java-WebClient")
            .defaultHeader("X-Title", "LumoraMenu") // Header personalizzato per identificare l'applicazione
            .build();
    }

    public List<Dish> generateCustomMenu(CustomMenuRequest request, String lang) {
        List<Dish> allDishes = dishRepository.findAll();
        String prompt = buildPrompt(request.getMealType(), request.getIntolerances(), allDishes);
        Map<String, Object> requestBody = Map.of("model", "mistralai/mistral-small-3.1-24b-instruct:free","messages", 
                                          List.of(Map.of("role", "user", "content", prompt)));
        try {
            ObjectMapper mapper = new ObjectMapper();
            String response = webClient.post()
                .bodyValue(mapper.writeValueAsString(requestBody))
                .retrieve()
                .bodyToMono(String.class)
                .block();
            if (response == null || response.trim().isEmpty()) {
                return List.of();
            }
            return parseResponseToDishes(response);

        } catch (WebClientResponseException exception) {
            // Gestione errori HTTP specifici
            System.err.println("HTTP error: " + exception.getStatusCode() + " - " + exception.getResponseBodyAsString());
        } catch (Exception exception) {
            // Gestione errori generici
            exception.printStackTrace();
        }
        // Ritorna lista vuota in caso di errore
        return List.of();
    }

    private String buildPrompt(String mealType, List<String> intolerances, List<Dish> allDishes) {
        StringBuilder stringBuilder = new StringBuilder();
        
        stringBuilder.append("Select 3 dishes suitable for the meal \"")
          .append(mealType)
          .append("\" avoiding (directly or indirectly) the following ingredients: ")
          .append(String.join(", ", intolerances))
          .append(".\nOnly choose from the following menu:\n");

        // Aggiunge tutti i piatti disponibili al prompt
        for (Dish dish : allDishes) {
            stringBuilder.append("- ")
              .append(dish.getNameEn())
              .append(" (").append(dish.getType())
              .append(", €").append(dish.getPrice())
              .append(")\n");
        }
        // Specifica il formato di risposta desiderato
        stringBuilder.append("\nRespond ONLY with a JSON array in the format: ").append("[{\"name\": \"...\", \"type\": \"...\", \"price\": ...}]");

        return stringBuilder.toString();
    }

    private List<Dish> parseResponseToDishes(String response) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            // Parsifica la risposta JSON completa
            JsonNode root = mapper.readTree(response);
            // Estrae il contenuto del messaggio dall'AI
            String content = root.at("/choices/0/message/content").asText();
            // Rimuove eventuali markdown code blocks dalla risposta
            if (content.startsWith("```")) {
                content = content.replaceAll("(?s)```json|```", "").trim();
            }

            // Converte il JSON in lista di oggetti Dish temporanei
            List<Dish> aiDishes = mapper.readValue(content, new TypeReference<List<Dish>>() {});
            // Recupera tutti i piatti reali dal database per il confronto
            List<Dish> allDishes = dishRepository.findAll();
            // Mappa ogni piatto suggerito dall'AI al corrispondente piatto nel database
            return aiDishes.stream()
            .map(aiDish -> allDishes.stream()
                .filter(dbDish ->
                    dbDish.getNameEn().equalsIgnoreCase(aiDish.getName().trim()) &&
                    dbDish.getType().equalsIgnoreCase(aiDish.getType().trim()) &&
                    Math.abs(dbDish.getPrice() - aiDish.getPrice()) < 0.01
                )
                .findFirst()
                .orElse(null)
            )
            .filter(dish -> dish != null)
            .toList();
            
        } catch (Exception e) {
            System.err.println("Error parsing JSON response: " + e.getMessage());
            return List.of(); // Ritorna lista vuota in caso di errore di parsing
        }
    }

    public CustomMenu saveConfirmedMenu(CustomMenu menu, String lang) {
        emailService.sendSavedCustomMenuEmail(menu, lang);
        return customMenuRepository.save(menu);
    }

    /* Recupera tutti i menu personalizzati creati da un utente specifico. */
    public List<CustomMenu> getMenusByUser(User user) {
        return customMenuRepository.findByUser(user);
    }

    public List<CustomMenu> getFilteredMenus(String date, String type) {
        if (date != null && type != null) {
            return customMenuRepository.findByDateAndType(LocalDate.parse(date), type);
        }
        else if (date != null) {
            return customMenuRepository.findByDate(LocalDate.parse(date));
        }
        else if (type != null) {
            return customMenuRepository.findByType(type);
        }
        else {
            return customMenuRepository.findAll();
        }
    }
}
