// Autor: Pedro Sousa Assumpção <pedroheitor55@gmail.com>

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  MovimentacaoEstoque,
  MovimentacaoEstoqueRequest
} from '../models/movimentacao-estoque.model';

const API_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoEstoqueService {
  private baseUrl = `${API_URL}/movimentacoes-estoque`;

  constructor(private http: HttpClient) {}

  list(): Observable<MovimentacaoEstoque[]> {
    return this.http.get<MovimentacaoEstoque[]>(this.baseUrl);
  }

  registrar(req: MovimentacaoEstoqueRequest, usuarioId: number): Observable<MovimentacaoEstoque> {
    return this.http.post<MovimentacaoEstoque>(
      `${this.baseUrl}?usuarioId=${usuarioId}`,
      req
    );
  }
}
