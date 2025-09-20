package com.lumora.backend.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingRequest {
    private Long userId;
    private String roomType;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private Integer totalPrice;
    private String status;
}
