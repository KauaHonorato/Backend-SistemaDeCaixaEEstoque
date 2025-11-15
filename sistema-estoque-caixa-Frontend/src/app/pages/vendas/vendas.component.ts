// Autor: Pedro Sousa Assumpção <pedroheitor55@gmail.com>

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Venda } from '../../core/models/venda.model';
import { VendaService } from '../../core/services/venda.service';
import { Usuario } from '../../core/models/usuario.model';
import { UsuarioService } from '../../core/services/usuario.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css']
})
export class VendasComponent implements OnInit {
  filtroForm: FormGroup;
  vendas: Venda[] = [];
  usuarios: Usuario[] = [];
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private vendaService: VendaService,
    private usuarioService: UsuarioService,
    private auth: AuthService
  ) {
    this.filtroForm = this.fb.group({
      usuarioId: [null],
      inicio: [''],
      fim: [''],
      valorMin: [null],
      valorMax: [null]
    });
  }

  ngOnInit(): void {
    const user = this.auth.getCurrentUser();
    if (user?.perfil === 'ADMIN') {
      this.usuarioService.list().subscribe({
        next: (data: Usuario[]) => (this.usuarios = data),
        error: () => (this.error = 'Erro ao carregar usuários.')
      });
    } else if (user) {
      this.filtroForm.patchValue({ usuarioId: user.id });
    }

    this.buscar();
  }

  private buildDateTimeLocalToIso(value: string | null): string | null {
    if (!value) return null;
    return value; // datetime-local já vem em formato aceito pelo backend
  }

  buscar(): void {
    this.error = null;
    const raw = this.filtroForm.value;

    const filtro = {
      usuarioId: raw.usuarioId ? Number(raw.usuarioId) : null,
      inicio: this.buildDateTimeLocalToIso(raw.inicio),
      fim: this.buildDateTimeLocalToIso(raw.fim),
      valorMin: raw.valorMin != null ? Number(raw.valorMin) : null,
      valorMax: raw.valorMax != null ? Number(raw.valorMax) : null
    };

    this.vendaService.consultar(filtro).subscribe({
      next: (data: Venda[]) => (this.vendas = data),
      error: () => (this.error = 'Erro ao consultar vendas.')
    });
  }

  totalGeral(): number {
    return this.vendas.reduce((acc, v) => acc + (v.valorTotal || 0), 0);
  }
}
