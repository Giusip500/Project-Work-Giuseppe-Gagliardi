package com.lumora.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lumora.backend.dto.BookingRequest;
import com.lumora.backend.dto.BookingResponse;
import com.lumora.backend.models.Booking;
import com.lumora.backend.services.BookingService;
import com.lumora.backend.services.MessageService;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

// Controller REST per la gestione delle prenotazioni hotel
@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    private final BookingService bookingService;

    @Autowired
    private MessageService messageService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingRequest request, @RequestParam(defaultValue = "en") String lang) {
        try {
            Booking booking = bookingService.createBooking(request);
            return ResponseEntity.ok(booking);
        } catch (RuntimeException e) {
            // Mappa errori specifici a chiavi di messaggio localizzate
            String errorKey = switch (e.getMessage()) {
                case "No available rooms" -> "booking.noRoomsAvailable";
                case "Room type not found" -> "booking.roomTypeNotFound";
                default -> "booking.error";
            };
            return ResponseEntity.badRequest().body(Map.of(
                "error", messageService.getMessage(errorKey, lang)
            ));
        }
    }

    @GetMapping("/user/{userId}")
    public List<BookingResponse> getBookingsByUser(@PathVariable Long userId) {
        return bookingService.getBookingsByUserId(userId);
    }
    //Verifica la disponibilità di una tipologia di camera per date specifiche
    @GetMapping("/availability")
    public boolean checkAvailability(@RequestParam String roomType, 
                                   @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkIn, 
                                   @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOut) {
        return bookingService.isRoomAvailable(roomType, checkIn, checkOut);
    }

    @GetMapping("/pendingAll")
    public List<BookingResponse> getPendingAll() {
        return bookingService.getPendingBookings();
    }

    @GetMapping("/confirmedAll")
    public List<BookingResponse> getConfirmedAll() {
        return bookingService.getConfirmedBookings();
    }

    @GetMapping("/rejectedAll")
    public List<BookingResponse> getRejectedAll() {
        return bookingService.getRejectedBookings();
    }

    // Aggiorna lo stato di una prenotazione (CONFIRMED/REJECTED/PENDIND)
    @PutMapping("/{bookingId}/status")
    public ResponseEntity<?> updateBookingStatus(@PathVariable Long bookingId, @RequestBody Map<String, String> payload, @RequestParam(defaultValue = "en") String lang) {
        try {
            String newStatus = payload.get("status");
            bookingService.updateBookingStatus(bookingId, newStatus);
            return ResponseEntity.ok(Map.of(
                "message", messageService.getMessage("booking.statusUpdated", lang)
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", messageService.getMessage("booking.notFound", lang)
            ));
        }
    }

    @DeleteMapping("/{bookingId}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long bookingId, @RequestParam(defaultValue = "en") String lang) {
        try {
            bookingService.deleteBooking(bookingId);
            return ResponseEntity.ok(Map.of(
                "message", messageService.getMessage("booking.deleted", lang)
            ));
        } catch (RuntimeException exception) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", messageService.getMessage("booking.notFound", lang)
            ));
        }
    }
}
