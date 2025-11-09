package com.example.GestaoEstoqueCaixa.SistemaGestaoEstoqueCaixa.dto;

import java.math.BigDecimal;

public record ProdutoResponse(
        Long id,
        String codigo,
        String nome,
        String categoria,
        Integer quantidadeEstoque,
        BigDecimal precoUnitario
) {

}
