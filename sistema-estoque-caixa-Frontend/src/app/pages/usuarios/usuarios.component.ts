// Autor: Pedro Sousa Assumpção <pedroheitor55@gmail.com>

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario, UsuarioRequest, PerfilUsuario } from '../../core/models/usuario.model';
import { UsuarioService } from '../../core/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  form: FormGroup;
  editingId: number | null = null;
  error: string | null = null;

  perfis: PerfilUsuario[] = ['ADMIN', 'OPERADOR'];

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {
    this.form = this.fb.group({
      nomeCompleto: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      perfil: ['OPERADOR', Validators.required],
      ativo: [true, Validators.required]
    });
  }

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.usuarioService.list().subscribe({
      next: (data: Usuario[]) => (this.usuarios = data),
      error: () => (this.error = 'Erro ao carregar usuários.')
    });
  }

  novo(): void {
    this.editingId = null;
    this.form.reset({
      nomeCompleto: '',
      email: '',
      senha: '',
      perfil: 'OPERADOR',
      ativo: true
    });
  }

  editar(usuario: Usuario): void {
    this.editingId = usuario.id;
    this.form.patchValue({
      nomeCompleto: usuario.nomeCompleto,
      email: usuario.email,
      senha: '',
      perfil: usuario.perfil,
      ativo: usuario.ativo
    });
  }

  salvar(): void {
    this.error = null;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const req: UsuarioRequest = this.form.value;

    if (this.editingId == null) {
      this.usuarioService.create(req).subscribe({
        next: () => {
          this.novo();
          this.carregar();
        },
        error: () => (this.error = 'Erro ao criar usuário.')
      });
    } else {
      this.usuarioService.update(this.editingId, req).subscribe({
        next: () => {
          this.novo();
          this.carregar();
        },
        error: () => (this.error = 'Erro ao atualizar usuário.')
      });
    }
  }

  alterarStatus(usuario: Usuario): void {
    this.usuarioService.toggleStatus(usuario.id).subscribe({
      next: () => this.carregar(),
      error: () => (this.error = 'Erro ao alterar status.')
    });
  }

  excluir(usuario: Usuario): void {
    if (!confirm(`Excluir usuário ${usuario.nomeCompleto}?`)) return;

    this.usuarioService.delete(usuario.id).subscribe({
      next: () => this.carregar(),
      error: () => (this.error = 'Erro ao excluir usuário.')
    });
  }
}
