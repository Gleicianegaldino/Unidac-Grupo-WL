package com.breakfast.backend.controller;

import com.breakfast.backend.model.Collaborator;
import com.breakfast.backend.repository.CollaboratorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/collaborators")
@CrossOrigin("*")
public class CollaboratorController {

    @Autowired
    private CollaboratorRepository collaboratorRepository;

    @PostMapping("/collaborator")
    public Collaborator newCollaborator(@RequestBody Collaborator newCollaborator) {
        return collaboratorRepository.save(newCollaborator);
    }

    @GetMapping("/collaborators")
    public List<Collaborator> getAllCollaborators() {
        return collaboratorRepository.findAll();
    }

    @GetMapping("/collaborator/{id}")
    public Collaborator getCollaboratorById(@PathVariable Long id) {
        return collaboratorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Collaborator not found with id: " + id));
    }

    @PutMapping("/collaborator/{id}")
    public Collaborator updateCollaborator(@RequestBody Collaborator newCollaborator, @PathVariable Long id) {
        return collaboratorRepository.findById(id)
                .map(collaborator -> {
                    collaborator.setName(newCollaborator.getName());
                    collaborator.setCpf(newCollaborator.getCpf());
                    return collaboratorRepository.save(collaborator);
                })
                .orElseThrow(() -> new RuntimeException("Collaborator not found with id: " + id));
    }

    @DeleteMapping("/collaborator/{id}")
    public ResponseEntity<String> deleteCollaborator(@PathVariable Long id) {
        if (!collaboratorRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Collaborator not found with id: " + id);
        }

        collaboratorRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body("Collaborator deleted successfully.");
    }
}