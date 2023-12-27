package com.breakfast.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.breakfast.backend.exception.BreakfastNotFoundException;
import com.breakfast.backend.model.Breakfast;
import com.breakfast.backend.model.Collaborator;
import com.breakfast.backend.repository.BreakfastRepository;
import com.breakfast.backend.repository.CollaboratorRepository;

import java.util.List;

@RestController
@RequestMapping("/breakfasts")
@CrossOrigin("*")
public class BreakfastController {
    
    @Autowired
    private BreakfastRepository breakfastRepository;

    @Autowired
    private CollaboratorRepository collaboratorRepository;
    
    @PostMapping("/breakfast")
    public ResponseEntity<Breakfast> newBreakfast(@RequestBody Breakfast newBreakfast) {
        try {
            List<Collaborator> collaborators = (List<Collaborator>) newBreakfast.getCollaborator();
            if (collaborators != null && !collaborators.isEmpty()) {
                Collaborator collaborator = collaborators.get(0);
                collaborator.getBreakfasts().add(newBreakfast);
                newBreakfast.setCollaborator(collaborator);
                collaboratorRepository.save(collaborator);
            }
            Breakfast createdBreakfast = breakfastRepository.save(newBreakfast);
            return new ResponseEntity<>(createdBreakfast, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    @GetMapping("/breakfasts")
    public List<Breakfast> getAllBreakfasts(){
        return breakfastRepository.findAll();
    }
    
    @GetMapping("/breakfast/{id}")
    Breakfast getBreakfastById(@PathVariable Long id) {
        return breakfastRepository.findById(id)
                .orElseThrow(() -> new BreakfastNotFoundException(id));
    }
    
    @PutMapping("/breakfast/{id}")
    Breakfast updateBreakfast(@RequestBody Breakfast newBreakfast, @PathVariable Long id) {
        return breakfastRepository.findById(id)
                .map(breakfast -> {
                    breakfast.setTitle(newBreakfast.getTitle());
                    breakfast.setDate(newBreakfast.getDate());
                    breakfast.setHour(newBreakfast.getHour());
                    return breakfastRepository.save(breakfast);
                }).orElseThrow(() -> new BreakfastNotFoundException(id));
    }
    @DeleteMapping("/breakfast/{id}")
    public ResponseEntity<String> deleteBreakfast(@PathVariable Long id) {
        try {
            System.out.println("Received DELETE request for ID: " + id);
            if (!breakfastRepository.existsById(id)) {
                System.out.println("Breakfast with ID " + id + " not found.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Breakfast not found.");
            }
            breakfastRepository.deleteById(id);
            System.out.println("Breakfast with ID " + id + " deleted successfully.");
            return ResponseEntity.status(HttpStatus.OK).body("Breakfast deleted successfully.");
        } catch (Exception e) {
            
            System.err.println("Exception during breakfast deletion: " + e.getMessage());
           
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting breakfast.");
        }
    }

    @GetMapping("/breakfasts/byCollaborator/{collaboratorId}")
    public List<Breakfast> getBreakfastsByCollaborator(@PathVariable Long collaboratorId) {
        return breakfastRepository.findByCollaboratorIdCollaborator(collaboratorId);
    }

        
    
}