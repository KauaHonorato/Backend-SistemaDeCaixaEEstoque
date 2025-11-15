// Autor: Pedro Sousa Assumpção <pedroheitor55@gmail.com>

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto, ProdutoRequest } from '../models/produto.model';

const API_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private baseUrl = `${API_URL}/produtos`;

  constructor(private http: HttpClient) {}

  list(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.baseUrl);
  }

  get(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.baseUrl}/${id}`);
  }

  create(req: ProdutoRequest): Observable<Produto> {
    return this.http.post<Produto>(this.baseUrl, req);
  }

  update(id: number, req: ProdutoRequest): Observable<Produto> {
    return this.http.put<Produto>(`${this.baseUrl}/${id}`, req);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
