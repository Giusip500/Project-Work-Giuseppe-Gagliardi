package com.lumora.backend.services;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

/**
 * Servizio per la gestione dei messaggi multilingue dell'applicazione.
 * Fornisce traduzione e localizzazione per messaggi di sistema, email e interfaccia utente.
 * Supporta attualmente inglese e italiano con fallback automatico all'inglese.
 */
@Service
public class MessageService {
    // Struttura: Map<lingua, Map<chiave, messaggio>>
    private static final Map<String, Map<String, String>> messages = initializeMessages();
    private static Map<String, Map<String, String>> initializeMessages() {
        Map<String, Map<String, String>> msgs = new HashMap<>();
        // ===== MESSAGGI IN INGLESE =====
        Map<String, String> enMessages = new HashMap<>();
        // Messaggi per operazioni utente
        enMessages.put("user.created", "User created successfully");
        enMessages.put("user.updated", "User updated successfully");
        enMessages.put("user.deleted", "User deleted successfully");
        enMessages.put("user.notFound", "User not found");
        enMessages.put("user.invalidCredentials", "Invalid credentials");
        enMessages.put("user.emailExists", "Email is already registered");
        enMessages.put("user.usernameExists", "Username is already taken");
        enMessages.put("user.passwordEmpty", "Password cannot be empty");
        enMessages.put("user.oldPasswordIncorrect", "Old password is incorrect");
        enMessages.put("user.passwordUpdated", "Password updated successfully");
        // Messaggi per operazioni prenotazioni
        enMessages.put("booking.statusUpdated", "Booking status updated successfully");
        enMessages.put("booking.deleted", "Booking deleted successfully");
        enMessages.put("booking.notFound", "Booking not found");
        enMessages.put("booking.noRoomsAvailable", "No available rooms");
        enMessages.put("booking.roomTypeNotFound", "Room type not found");
        // Messaggi per menu personalizzati
        enMessages.put("menu.confirmed", "Menu confirmed successfully");
        // Template email di benvenuto
        enMessages.put("welcome.subject", "Welcome to Lumora");
        enMessages.put("welcome.body", 
            "Dear {username},\n\n" +
            "Thank you for registering on Lumora!\n\n" +
            "For any questions or problems, our team is always available at lumora@gmail.com.\n" +
            "See you soon,\n" +
            "The Lumora Team");
        // Template email aggiornamento prenotazione
        enMessages.put("booking.update.subject", "Update on your Reservation!");
        enMessages.put("booking.update.body", 
            "Dear {username},\n\n" +
            "The status of your booking for room type {roomType} from {checkIn} to {checkOut} " +
            "has been updated to:\n\n{status}\n\n" +
            "Thank you for choosing us.\n\n" +
            "- Lumora Hotel");
        // Template email menu salvato
        enMessages.put("menu.saved.subject", "Custom Menu Saved!");
        enMessages.put("menu.saved.body", 
            "Dear {username},\n\n" +
            "Your Custom Menu is now saved!\n" +
            "You can now look it up in your \"My Custom Menus\" page.\n" +
            "See you soon,\n" +
            "The Lumora Team");
        // ===== MESSAGGI IN ITALIANO =====
        Map<String, String> itMessages = new HashMap<>();
        // Messaggi per operazioni utente (traduzione italiana)
        itMessages.put("user.created", "Utente creato con successo");
        itMessages.put("user.updated", "Utente aggiornato con successo");
        itMessages.put("user.deleted", "Utente eliminato con successo");
        itMessages.put("user.notFound", "Utente non trovato");
        itMessages.put("user.invalidCredentials", "Credenziali non valide");
        itMessages.put("user.emailExists", "Email già registrata");
        itMessages.put("user.usernameExists", "Nome utente già in uso");
        itMessages.put("user.passwordEmpty", "La password non può essere vuota");
        itMessages.put("user.oldPasswordIncorrect", "La vecchia password non è corretta");
        itMessages.put("user.passwordUpdated", "Password aggiornata con successo");
        // Messaggi per operazioni prenotazioni (traduzione italiana)
        itMessages.put("booking.statusUpdated", "Stato prenotazione aggiornato con successo");
        itMessages.put("booking.deleted", "Prenotazione eliminata con successo");
        itMessages.put("booking.notFound", "Prenotazione non trovata");
        itMessages.put("booking.noRoomsAvailable", "Nessuna camera disponibile");
        itMessages.put("booking.roomTypeNotFound", "Tipo di camera non trovato");
        // Messaggi per menu personalizzati (traduzione italiana)
        itMessages.put("menu.confirmed", "Menu confermato con successo");
        // Template email di benvenuto (italiano)
        itMessages.put("welcome.subject", "Benvenuto in Lumora");
        itMessages.put("welcome.body", 
            "Caro {username},\n\n" +
            "Grazie per esserti registrato su Lumora!\n\n" +
            "Per qualsiasi domanda o problema, il nostro team è sempre disponibile " +
            "all'indirizzo lumora@gmail.com.\n" +
            "A presto,\n" +
            "Il Team Lumora");
        // Template email aggiornamento prenotazione (italiano)
        itMessages.put("booking.update.subject", "Aggiornamento sulla tua Prenotazione!");
        itMessages.put("booking.update.body", 
            "Caro {username},\n\n" +
            "Lo stato della tua prenotazione per il tipo di camera {roomType} " +
            "dal {checkIn} al {checkOut} è stato aggiornato a:\n\n{status}\n\n" +
            "Grazie per averci scelto.\n\n" +
            "- Lumora Hotel");
        // Template email menu salvato (italiano)
        itMessages.put("menu.saved.subject", "Menu Personalizzato Salvato!");
        itMessages.put("menu.saved.body", 
            "Caro {username},\n\n" +
            "Il tuo Menu Personalizzato è ora salvato!\n" +
            "Puoi consultarlo nella pagina \"I Miei Menu Personalizzati\".\n" +
            "A presto,\n" +
            "Il Team Lumora");
        // Aggiunge le mappe di traduzione alla mappa principale
        msgs.put("en", enMessages);
        msgs.put("it", itMessages);
        return msgs;
    }

    // Recupera un messaggio localizzato per una chiave specifica
    public String getMessage(String key, String language) {
        return messages.getOrDefault(language, messages.get("en")).getOrDefault(key, key);
    }

    // Recupera un messaggio localizzato e sostituisce i parametri con valori dinamici.
    public String getMessage(String key, String language, Map<String, String> params) {
        String message = getMessage(key, language);
        // Sostituisce ogni parametro nel messaggio
        for (Map.Entry<String, String> entry : params.entrySet()) {
            message = message.replace("{" + entry.getKey() + "}", entry.getValue());
        }
        return message;
    }
}
