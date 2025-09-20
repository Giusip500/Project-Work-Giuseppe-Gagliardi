package com.lumora.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LocalizedDishResponse {
    private Long id;
    private String type;
    private String name;
    private Double price;
}
