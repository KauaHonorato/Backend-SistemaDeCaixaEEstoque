package com.example.GestaoEstoqueCaixa.SistemaGestaoEstoqueCaixa.controller;

import com.example.GestaoEstoqueCaixa.SistemaGestaoEstoqueCaixa.dto.MovimentacaoEstoqueRequest;
import com.example.GestaoEstoqueCaixa.SistemaGestaoEstoqueCaixa.dto.MovimentacaoEstoqueResponse;
import com.example.GestaoEstoqueCaixa.SistemaGestaoEstoqueCaixa.service.MovimentacaoEstoqueService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movimentacoes-estoque")
@CrossOrigin("*")
public class MovimentacaoEstoqueController {

    private final MovimentacaoEstoqueService service;

    public MovimentacaoEstoqueController(MovimentacaoEstoqueService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<MovimentacaoEstoqueResponse>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @PostMapping
    public ResponseEntity<MovimentacaoEstoqueResponse> registrar(
            @Valid @RequestBody MovimentacaoEstoqueRequest request,
            @RequestParam Long usuarioId
    ) {
        return ResponseEntity.ok(service.registrar(request, usuarioId));
    }
}
