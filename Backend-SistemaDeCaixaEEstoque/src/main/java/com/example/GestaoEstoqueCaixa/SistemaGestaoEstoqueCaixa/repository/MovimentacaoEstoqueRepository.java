package com.example.GestaoEstoqueCaixa.SistemaGestaoEstoqueCaixa.repository;

import com.example.GestaoEstoqueCaixa.SistemaGestaoEstoqueCaixa.entity.MovimentacaoEstoque;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovimentacaoEstoqueRepository extends JpaRepository<MovimentacaoEstoque, Long> {
    List<MovimentacaoEstoque> findAllByOrderByDataHoraDesc();
}
