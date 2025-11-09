package com.example.GestaoEstoqueCaixa.SistemaGestaoEstoqueCaixa.mapper;

import com.example.GestaoEstoqueCaixa.SistemaGestaoEstoqueCaixa.dto.ItemVendaResponse;
import com.example.GestaoEstoqueCaixa.SistemaGestaoEstoqueCaixa.entity.ItemVenda;

public final class ItemVendaMapper {

    private ItemVendaMapper() {}

    public static ItemVendaResponse toResponse(ItemVenda iv) {
        return new ItemVendaResponse(
                iv.getProduto().getNome(),
                iv.getQuantidade(),
                iv.getPrecoUnitario(),
                iv.getSubtotal()
        );
    }
}
