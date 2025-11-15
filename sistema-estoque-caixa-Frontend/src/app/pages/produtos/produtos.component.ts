// Autor: Pedro Sousa Assumpção <pedroheitor55@gmail.com>

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produto, ProdutoRequest } from '../../core/models/produto.model';
import { ProdutoService } from '../../core/services/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {
  produtos: Produto[] = [];
  form: FormGroup;
  editingId: number | null = null;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService
  ) {
    this.form = this.fb.group({
      codigo: ['', Validators.required],
      nome: ['', Validators.required],
      categoria: [''],
      quantidadeEstoque: [0, [Validators.required, Validators.min(0)]],
      precoUnitario: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.produtoService.list().subscribe({
      next: (data: Produto[]) => (this.produtos = data),
      error: () => (this.error = 'Erro ao carregar produtos.')
    });
  }

  novo(): void {
    this.editingId = null;
    this.form.reset({
      codigo: '',
      nome: '',
      categoria: '',
      quantidadeEstoque: 0,
      precoUnitario: 0
    });
  }

  editar(produto: Produto): void {
    this.editingId = produto.id;
    this.form.patchValue({
      codigo: produto.codigo,
      nome: produto.nome,
      categoria: produto.categoria,
      quantidadeEstoque: produto.quantidadeEstoque,
      precoUnitario: produto.precoUnitario
    });
  }

  salvar(): void {
    this.error = null;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const req: ProdutoRequest = this.form.value;

    if (this.editingId == null) {
      this.produtoService.create(req).subscribe({
        next: () => {
          this.novo();
          this.carregar();
        },
        error: () => (this.error = 'Erro ao criar produto.')
      });
    } else {
      this.produtoService.update(this.editingId, req).subscribe({
        next: () => {
          this.novo();
          this.carregar();
        },
        error: () => (this.error = 'Erro ao atualizar produto.')
      });
    }
  }

  excluir(produto: Produto): void {
    if (!confirm(`Excluir produto ${produto.nome}?`)) return;

    this.produtoService.delete(produto.id).subscribe({
      next: () => this.carregar(),
      error: () => (this.error = 'Erro ao excluir produto.')
    });
  }
}
