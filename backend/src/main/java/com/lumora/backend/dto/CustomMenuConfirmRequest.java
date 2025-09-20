package com.lumora.backend.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@AllArgsConstructor
@Getter
@Setter
public class CustomMenuConfirmRequest {
    private List<Long> dishIds;
    private LocalDate date;
    private String type;
    private Long userId;
}
