export type PerfilUsuario = 'ADMIN' | 'OPERADOR';

export interface Usuario {
  id: number;
  nomeCompleto: string;
  email: string;
  perfil: PerfilUsuario;
  ativo: boolean;
}

export interface UsuarioRequest {
  nomeCompleto: string;
  email: string;
  senha: string;
  perfil: PerfilUsuario;
  ativo: boolean;
}
