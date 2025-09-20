package com.lumora.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lumora.backend.models.RoomType;

public interface RoomTypeRepository extends JpaRepository<RoomType, Long>{
    Optional<RoomType> findByName(String name);
}
