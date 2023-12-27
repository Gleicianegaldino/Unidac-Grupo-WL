package com.breakfast.backend.repository;

import com.breakfast.backend.model.Collaborator;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CollaboratorRepository extends JpaRepository<Collaborator, Long> {
}