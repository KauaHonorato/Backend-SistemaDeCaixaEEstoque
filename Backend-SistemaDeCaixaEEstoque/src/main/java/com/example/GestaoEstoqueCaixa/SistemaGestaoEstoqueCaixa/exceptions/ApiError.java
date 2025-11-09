package com.example.GestaoEstoqueCaixa.SistemaGestaoEstoqueCaixa.exceptions;

import java.time.OffsetDateTime;

public record ApiError(
        int status,
        String error,
        String message,
        String path,
        OffsetDateTime timestamp
) {}
