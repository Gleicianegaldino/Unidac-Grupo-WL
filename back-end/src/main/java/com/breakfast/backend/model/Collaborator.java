package com.breakfast.backend.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.List;
import java.util.Set;

@Entity
public class Collaborator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCollaborator;

    private String name;
    private String cpf;

    @OneToMany(mappedBy = "collaborator", cascade = CascadeType.ALL)
    private Set<Breakfast> breakfasts;

   
    public Collaborator() {
    }

    public Collaborator(String name, String cpf) {
        this.name = name;
        this.cpf = cpf;
    }

    // Getters e Setters
    public Long getIdCollaborator() {
        return idCollaborator;
    }

    public void setIdCollaborator(Long idCollaborator) {
        this.idCollaborator = idCollaborator;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public List<Breakfast> getBreakfasts() {
        return null;
    }
}