package com.lumora.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class BookingResponse {
    private Long id;
    private Long room;
    private String roomType;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private Integer totalPrice;
    private String status;
}
