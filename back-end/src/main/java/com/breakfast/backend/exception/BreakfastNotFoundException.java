package com.breakfast.backend.exception;


public class BreakfastNotFoundException extends RuntimeException {

    public BreakfastNotFoundException(Long id){
        super("Could not found the breakfast");
    }
}