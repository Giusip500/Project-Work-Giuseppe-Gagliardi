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
public class CustomMenuRequest {
    private List<String> intolerances;
    private String mealType;
    private LocalDate date;
    private Long userId;
}
