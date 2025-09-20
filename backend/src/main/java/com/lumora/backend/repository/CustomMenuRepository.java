package com.lumora.backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lumora.backend.models.CustomMenu;
import com.lumora.backend.models.User;

public interface CustomMenuRepository extends JpaRepository<CustomMenu, Long> {
    List<CustomMenu> findByUser(User user);
    List<CustomMenu> findByDate(LocalDate date);
    List<CustomMenu> findByType(String type);
    List<CustomMenu> findByDateAndType(LocalDate date, String type);
}
