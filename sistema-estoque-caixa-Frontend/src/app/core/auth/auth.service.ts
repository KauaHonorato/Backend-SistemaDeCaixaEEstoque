// Autor: Pedro Sousa Assumpção <pedroheitor55@gmail.com>

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Usuario, PerfilUsuario } from '../models/usuario.model';

const API_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  private authHeader: string | null = null;

  constructor(private http: HttpClient) {
    // Sem uso de localStorage aqui
  }

  login(email: string, senha: string): Observable<Usuario> {
    const header = 'Basic ' + btoa(`${email}:${senha}`);
    const headers = new HttpHeaders({ Authorization: header });

    return this.http.get<Usuario>(`${API_URL}/auth/me`, { headers }).pipe(
      tap(user => {
        this.authHeader = header;
        this.currentUserSubject.next(user);
      })
    );
  }

  logout(): void {
    this.authHeader = null;
    this.currentUserSubject.next(null);
  }

  getAuthorizationHeader(): string | null {
    return this.authHeader;
  }

  getCurrentUser(): Usuario | null {
    return this.currentUserSubject.value;
  }

  hasRole(role: PerfilUsuario): boolean {
    const user = this.currentUserSubject.value;
    return !!user && user.perfil === role;
  }
}
