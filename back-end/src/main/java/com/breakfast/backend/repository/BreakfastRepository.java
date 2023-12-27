package com.breakfast.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.breakfast.backend.model.Breakfast;

import java.util.List;

public interface BreakfastRepository extends JpaRepository<Breakfast, Long> {

    List<Breakfast> findByCollaboratorIdCollaborator(Long collaboratorId);
}