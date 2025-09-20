package com.lumora.backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.lumora.backend.models.Booking;
import com.lumora.backend.models.Room;
import com.lumora.backend.models.User;

public interface BookingRepository extends JpaRepository<Booking, Long>{
    List<Booking> findByUser(User user);
    List<Booking> findByStatus(String string);

    @Query("SELECT CASE WHEN COUNT(b) > 0 THEN true ELSE false END FROM Booking b " + "WHERE b.room = :room AND NOT (b.checkInDate >= :checkOutDate OR b.checkOutDate <= :checkInDate)")
    boolean existsByRoomAndDatesOverlap(@Param("room") Room room, @Param("checkInDate") LocalDate checkInDate, @Param("checkOutDate") LocalDate checkOutDate);
}
