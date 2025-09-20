package com.lumora.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lumora.backend.models.Dish;

public interface DishRepository extends JpaRepository<Dish, Long>{
    
}
