// Autor: Pedro Sousa Assumpção <pedroheitor55@gmail.com>

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MovimentacaoEstoque,
  MovimentacaoEstoqueRequest,
  TipoMovimentacao
} from '../../core/models/movimentacao-estoque.model';
import { MovimentacaoEstoqueService } from '../../core/services/movimentacao-estoque.service';
import { Produto } from '../../core/models/produto.model';
import { ProdutoService } from '../../core/services/produto.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-movimentacoes',
  templateUrl: './movimentacoes.component.html',
  styleUrls: ['./movimentacoes.component.css']
})
export class MovimentacoesComponent implements OnInit {
  movimentacoes: MovimentacaoEstoque[] = [];
  produtos: Produto[] = [];
  tipos: TipoMovimentacao[] = ['ENTRADA', 'AJUSTE_POSITIVO', 'AJUSTE_NEGATIVO'];

  form: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private movimentacaoService: MovimentacaoEstoqueService,
    private produtoService: ProdutoService,
    private auth: AuthService
  ) {
    this.form = this.fb.group({
      produtoId: [null, Validators.required],
      tipo: ['ENTRADA', Validators.required],
      quantidade: [1, [Validators.required, Validators.min(1)]],
      motivo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.carregarProdutos();
    this.carregarMovimentacoes();
  }

  carregarProdutos(): void {
    this.produtoService.list().subscribe({
      next: (data: Produto[]) => (this.produtos = data),
      error: () => (this.error = 'Erro ao carregar produtos.')
    });
  }

  carregarMovimentacoes(): void {
    this.movimentacaoService.list().subscribe({
      next: (data: MovimentacaoEstoque[]) => (this.movimentacoes = data),
      error: () => (this.error = 'Erro ao carregar movimentações.')
    });
  }

  registrar(): void {
    this.error = null;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const usuario = this.auth.getCurrentUser();
    if (!usuario) {
      this.error = 'Usuário não autenticado.';
      return;
    }

    const req: MovimentacaoEstoqueRequest = this.form.value;

    this.movimentacaoService.registrar(req, usuario.id).subscribe({
      next: () => {
        this.form.reset({
          produtoId: null,
          tipo: 'ENTRADA',
          quantidade: 1,
          motivo: ''
        });
        this.carregarMovimentacoes();
      },
      error: (err) => {
        this.error = err?.error?.message || 'Erro ao registrar movimentação.';
      }
    });
  }
}
