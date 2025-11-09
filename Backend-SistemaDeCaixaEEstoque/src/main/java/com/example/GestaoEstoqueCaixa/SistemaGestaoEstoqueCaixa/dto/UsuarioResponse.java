package com.example.GestaoEstoqueCaixa.SistemaGestaoEstoqueCaixa.dto;

import com.example.GestaoEstoqueCaixa.SistemaGestaoEstoqueCaixa.enums.PerfilUsuario;

public record UsuarioResponse(
        Long id,
        String nomeCompleto,
        String email,
        PerfilUsuario perfil,
        Boolean ativo
) {

}
