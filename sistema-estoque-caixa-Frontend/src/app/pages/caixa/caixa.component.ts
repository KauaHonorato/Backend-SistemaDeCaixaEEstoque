// Autor: Pedro Sousa Assumpção <pedroheitor55@gmail.com>

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produto } from '../../core/models/produto.model';
import { ProdutoService } from '../../core/services/produto.service';
import { VendaService } from '../../core/services/venda.service';
import { AuthService } from '../../core/auth/auth.service';
import { ItemVendaRequest, Venda, VendaRequest } from '../../core/models/venda.model';

@Component({
  selector: 'app-caixa',
  templateUrl: './caixa.component.html',
  styleUrls: ['./caixa.component.css']
})
export class CaixaComponent implements OnInit {
  produtos: Produto[] = [];
  form: FormGroup;
  ultimaVenda: Venda | null = null;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private vendaService: VendaService,
    private auth: AuthService
  ) {
    this.form = this.fb.group({
      itens: this.fb.array([]),
      valorRecebido: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    this.produtoService.list().subscribe({
      next: (data: Produto[]) => (this.produtos = data),
      error: () => (this.error = 'Erro ao carregar produtos.')
    });
    this.adicionarItem();
  }

  get itens(): FormArray {
    return this.form.get('itens') as FormArray;
  }

  criarItem(): FormGroup {
    return this.fb.group({
      produtoId: [null, Validators.required],
      quantidade: [1, [Validators.required, Validators.min(1)]]
    });
  }

  adicionarItem(): void {
    this.itens.push(this.criarItem());
  }

  removerItem(index: number): void {
    if (this.itens.length > 1) {
      this.itens.removeAt(index);
    }
  }

  getValorTotal(): number {
    let total = 0;
    this.itens.controls.forEach((ctrl) => {
      const produtoId = ctrl.get('produtoId')?.value;
      const qtd = ctrl.get('quantidade')?.value || 0;
      const produto = this.produtos.find((p) => p.id === +produtoId);
      if (produto) {
        total += produto.precoUnitario * qtd;
      }
    });
    return total;
  }

  getTroco(): number {
    const valorTotal = this.getValorTotal();
    const valorRecebido = this.form.get('valorRecebido')?.value || 0;
    return valorRecebido - valorTotal;
  }

  registrarVenda(): void {
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

    const valorTotal = this.getValorTotal();
    const valorRecebido = this.form.get('valorRecebido')?.value || 0;

    if (valorRecebido < valorTotal) {
      this.error = 'Valor recebido menor que o total.';
      return;
    }

    const itensReq: ItemVendaRequest[] = this.itens.controls.map((ctrl) => ({
      produtoId: ctrl.get('produtoId')?.value,
      quantidade: ctrl.get('quantidade')?.value
    }));

    const req: VendaRequest = {
      itens: itensReq,
      valorRecebido
    };

    this.vendaService.registrar(usuario.id, req).subscribe({
      next: (venda: Venda) => {
        this.ultimaVenda = venda;
        this.form.reset({ valorRecebido: 0 });
        this.itens.clear();
        this.adicionarItem();
      },
      error: (err) => {
        this.error = err?.error?.message || 'Erro ao registrar venda.';
      }
    });
  }
}
