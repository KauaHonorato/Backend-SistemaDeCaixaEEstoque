// Autor: Pedro Sousa Assumpção <pedroheitor55@gmail.com>

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario, UsuarioRequest } from '../models/usuario.model';

const API_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = `${API_URL}/usuarios`;

  constructor(private http: HttpClient) {}

  list(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl);
  }

  get(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/${id}`);
  }

  create(req: UsuarioRequest): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseUrl, req);
  }

  update(id: number, req: UsuarioRequest): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseUrl}/${id}`, req);
  }

  toggleStatus(id: number): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.baseUrl}/${id}/status`, {});
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
