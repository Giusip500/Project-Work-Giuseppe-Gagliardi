package com.lumora.backend.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@AllArgsConstructor
@Getter
@Setter
public class CustomMenuResponse {
    private List<LocalizedDishResponse> recommendedDishes;
}
