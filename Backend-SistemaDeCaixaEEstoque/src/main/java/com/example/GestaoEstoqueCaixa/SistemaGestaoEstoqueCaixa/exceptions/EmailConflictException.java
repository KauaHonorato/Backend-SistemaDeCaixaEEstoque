package com.example.GestaoEstoqueCaixa.SistemaGestaoEstoqueCaixa.exceptions;

public class EmailConflictException extends RuntimeException {
    public EmailConflictException(String message) {
        super(message);
    }
}
