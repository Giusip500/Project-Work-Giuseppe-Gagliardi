package com.lumora.backend.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.lumora.backend.models.User;
import com.lumora.backend.repository.UserRepository;
import com.lumora.backend.services.EmailService;
import com.lumora.backend.services.MessageService;

// Controller REST per la gestione degli utenti

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Autowired
    private MessageService messageService;

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user, @RequestParam(defaultValue = "en") String lang) {
        try {
            // Validazione password non vuota
            if (user.getPassword() == null || user.getPassword().isBlank()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", messageService.getMessage("user.passwordEmpty", lang));
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
            }
            // Verifica univocità email
            if (userRepository.findByEmail(user.getEmail()).isPresent()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", messageService.getMessage("user.emailExists", lang));
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
            }
            // Verifica univocità username
            if (userRepository.findByUsername(user.getUsername()).isPresent()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", messageService.getMessage("user.usernameExists", lang));
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
            }
            // Cripta password e salva utente
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            // Invio Email di benvenuto
            emailService.sendSignInUpdateEmail(user, lang);

            User savedUser = userRepository.save(user);
            Map<String, Object> response = new HashMap<>();

            response.put("message", messageService.getMessage("user.created", lang));
            response.put("user", savedUser);
            return ResponseEntity.ok(response);
        } catch (Exception exception) {
            exception.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error while creating user");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping("/exists/email")
    public boolean checkEmailExists(@RequestParam String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    @GetMapping("/exists/username")
    public boolean checkUsernameExists(@RequestParam String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser, @RequestParam(defaultValue = "en") String lang) {
        Optional<User> userOptional = userRepository.findByEmail(loginUser.getEmail());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Verifica password con hash BCrypt
            if (passwordEncoder.matches(loginUser.getPassword(), user.getPassword())) {
                Map<String, Object> resp = new HashMap<>();
                resp.put("message", "Login successful");
                resp.put("id", user.getId());
                resp.put("username", user.getUsername());
                resp.put("email", user.getEmail());
                resp.put("avatar", user.getAvatar() != null ? user.getAvatar() : "");
                resp.put("role", user.getRole());
                return ResponseEntity.ok(resp);
            }
        }
        Map<String, String> error = new HashMap<>();
        error.put("error", messageService.getMessage("user.invalidCredentials", lang));
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email, @RequestParam(defaultValue = "en") String lang) {
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            Map<String, String> error = new HashMap<>();
            error.put("error", messageService.getMessage("user.notFound", lang));
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<?> getUserByUsername(@PathVariable String username, @RequestParam(defaultValue = "en") String lang) {
        Optional<User> user = userRepository.findByUsername(username);
        if(user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            Map<String, String> error = new HashMap<>();
            error.put("error", messageService.getMessage("user.notFound", lang));
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }

    @PutMapping("/{email}")
    public ResponseEntity<?> updateUser(@PathVariable String email, @RequestBody User updatedUser, @RequestParam(defaultValue = "en") String lang) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            user.setUsername(updatedUser.getUsername());
            
            // Aggiorna password solo se fornita
            if (updatedUser.getPassword() != null && !updatedUser.getPassword().isBlank()) {
                user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
            }
            // Aggiorna avatar solo se fornito
            if (updatedUser.getAvatar() != null && !updatedUser.getAvatar().isBlank()) {
                user.setAvatar(updatedUser.getAvatar());
            }

            userRepository.save(user);
            return ResponseEntity.ok(Map.of("message", messageService.getMessage("user.updated", lang), "avatar", user.getAvatar() != null ? user.getAvatar() : ""));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", messageService.getMessage("user.notFound", lang)));
        }
    }

    @PutMapping("/update-password/{email}")
    public ResponseEntity<?> changePassword(@PathVariable String email, @RequestBody Map<String, String> passwords, @RequestParam(defaultValue = "en") String lang) {
        String oldPassword = passwords.get("oldPassword");
        String newPassword = passwords.get("newPassword");

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", messageService.getMessage("user.notFound", lang)));
        }
        // Verifica corrispondenza vecchia password
        User user = userOptional.get();
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", messageService.getMessage("user.oldPasswordIncorrect", lang)));
        }
        // Imposta nuova password criptata
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", messageService.getMessage("user.passwordUpdated", lang)));
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<?> deleteUser(@PathVariable String email, @RequestParam(defaultValue = "en") String lang) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            userRepository.delete(userOptional.get());
            return ResponseEntity.ok(Map.of("message", messageService.getMessage("user.deleted", lang)));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", messageService.getMessage("user.notFound", lang)));
        }
    }
}
