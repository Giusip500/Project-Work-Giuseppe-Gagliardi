package com.lumora.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lumora.backend.models.Room;
import com.lumora.backend.models.RoomType;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long>{
    List<Room> findByRoomType(RoomType roomType);
}
