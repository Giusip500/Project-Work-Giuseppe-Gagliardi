package com.lumora.backend.services;

import com.lumora.backend.dto.BookingRequest;
import com.lumora.backend.dto.BookingResponse;
import com.lumora.backend.models.Booking;
import com.lumora.backend.models.Room;
import com.lumora.backend.models.RoomType;
import com.lumora.backend.models.User;
import com.lumora.backend.repository.BookingRepository;
import com.lumora.backend.repository.UserRepository;
import com.lumora.backend.repository.RoomRepository;
import com.lumora.backend.repository.RoomTypeRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

// Servizio per la gestione delle prenotazioni dell'hotel
@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final RoomTypeRepository roomTypeRepository;
    
    private final EmailService emailService;

    public BookingService(BookingRepository bookingRepository, UserRepository userRepository, RoomRepository roomRepository, RoomTypeRepository roomTypeRepository, EmailService emailService) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
        this.roomTypeRepository = roomTypeRepository;
        this.emailService = emailService;
    }

    public Booking createBooking(BookingRequest request) {
        // Estrazione dei parametri dalla richiesta
        String roomTypeName = request.getRoomType();
        LocalDate checkInDate = request.getCheckInDate();
        LocalDate checkOutDate = request.getCheckOutDate();
        Integer totalPrice = request.getTotalPrice();
        String status = request.getStatus();
        Long userId = request.getUserId();

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Room availableRoom = findAvailableRoom(roomTypeName, checkInDate, checkOutDate).orElseThrow(() -> new RuntimeException("No available rooms"));
        
        // Costruzione dell'oggetto Booking usando il pattern Builder
        Booking booking = Booking.builder()
            .room(availableRoom)
            .checkInDate(checkInDate)
            .checkOutDate(checkOutDate)
            .totalPrice(totalPrice)
            .status(status)
            .user(user)
            .build();

        return bookingRepository.save(booking);
    }

    public List<BookingResponse> getBookingsByUserId(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        List<Booking> bookings = bookingRepository.findByUser(user);
        
        // Conversione da entità a DTO usando stream e mapping
        return bookings.stream().map(booking -> new BookingResponse(
                booking.getId(),
                booking.getRoom().getId(),
                booking.getRoom().getRoomType().getName(),
                booking.getCheckInDate(),
                booking.getCheckOutDate(),
                booking.getTotalPrice(),
                booking.getStatus()
            )).collect(Collectors.toList());
    }

    public boolean isRoomAvailable(String roomTypeName, LocalDate checkInDate, LocalDate checkOutDate) {
        RoomType roomType = roomTypeRepository.findByName(roomTypeName).orElseThrow(() -> new RuntimeException("Room type not found"));
        List<Room> rooms = roomRepository.findByRoomType(roomType);
        System.out.println("Available rooms for type: " + roomTypeName + " - " + rooms.size() + " rooms found.");
        // Prima verifica: controlla ogni camera per disponibilità
        for (Room room : rooms) {
            boolean isBooked = bookingRepository.existsByRoomAndDatesOverlap(room, checkInDate, checkOutDate);
            System.out.println("Checking availability for room: " + room.getRoomNumber() + 
                               " - Available: " + !isBooked);
            if (!isBooked) {
                return true;
            }
        }
        // Seconda verifica (codice duplicato - possibile refactoring)
        System.out.println("Checking room availability from " + checkInDate + " to " + checkOutDate);
        for (Room room : rooms) {
            boolean isBooked = bookingRepository.existsByRoomAndDatesOverlap(room, checkInDate, checkOutDate);
            System.out.println("Room: " + room.getRoomNumber() + " - Availability: " + !isBooked);
            if (!isBooked) {
                return true;
            }
        }
        System.out.println("No available rooms found.");
        return false;
    }

    private java.util.Optional<Room> findAvailableRoom(String roomTypeName, LocalDate checkInDate, LocalDate checkOutDate) {
        RoomType roomType = roomTypeRepository.findByName(roomTypeName).orElseThrow(() -> new RuntimeException("Room type not found"));
        List<Room> rooms = roomRepository.findByRoomType(roomType);
        for (Room room : rooms) {
            boolean isBooked = bookingRepository.existsByRoomAndDatesOverlap(room, checkInDate, checkOutDate);
            if (!isBooked) {
                return java.util.Optional.of(room);
            }
        }
        return java.util.Optional.empty();
    }

    public List<BookingResponse> getPendingBookings() {
        List<Booking> pendingBookings = bookingRepository.findByStatus("PENDING");
        return pendingBookings.stream().map(booking -> new BookingResponse(
                booking.getId(),
                booking.getRoom().getId(),
                booking.getRoom().getRoomType().getName(),
                booking.getCheckInDate(),
                booking.getCheckOutDate(),
                booking.getTotalPrice(),
                booking.getStatus()
            )).collect(Collectors.toList());
    }

    public List<BookingResponse> getConfirmedBookings() {
        List<Booking> confirmedBookings = bookingRepository.findByStatus("CONFIRMED");
        return confirmedBookings.stream().map(booking -> new BookingResponse(
                booking.getId(),
                booking.getRoom().getId(),
                booking.getRoom().getRoomType().getName(),
                booking.getCheckInDate(),
                booking.getCheckOutDate(),
                booking.getTotalPrice(),
                booking.getStatus()
            )).collect(Collectors.toList());
    }

    public List<BookingResponse> getRejectedBookings() {
        List<Booking> rejectedBookings = bookingRepository.findByStatus("REJECTED");
        return rejectedBookings.stream().map(booking -> new BookingResponse(
                booking.getId(),
                booking.getRoom().getId(),
                booking.getRoom().getRoomType().getName(),
                booking.getCheckInDate(),
                booking.getCheckOutDate(),
                booking.getTotalPrice(),
                booking.getStatus()
            )).collect(Collectors.toList());
    }

    public void updateBookingStatus(Long bookingId, String newStatus) {
        Booking booking = bookingRepository.findById(bookingId).orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus(newStatus);
        bookingRepository.save(booking);
        emailService.sendStatusUpdateEmail(booking);
    }

    public void deleteBooking(Long bookingId) {
        bookingRepository.deleteById(bookingId);
    }
}
