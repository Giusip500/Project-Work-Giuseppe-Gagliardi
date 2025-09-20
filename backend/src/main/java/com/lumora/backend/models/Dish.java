package com.lumora.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "menu")
@Entity
public class Dish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;
    private String nameEn;
    private String nameIt;
    private Double price;

    public Dish(String name, String type, Double price) {
        this.nameEn = name;
        this.nameIt = name;
        this.type = type;
        this.price = price;
    }

    public String getName(String language) {
        if ("it".equalsIgnoreCase(language)) {
            return nameIt != null ? nameIt : nameEn;
        }
        return nameEn;
    }

    public String getName() {
        return nameEn;
    }

    public void setName(String name) {
        this.nameEn = name;
    }
}
