// Autor: Pedro Sousa Assumpção <pedroheitor55@gmail.com>

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venda, VendaRequest } from '../models/venda.model';

const API_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class VendaService {
  private baseUrl = `${API_URL}/vendas`;

  constructor(private http: HttpClient) {}

  registrar(usuarioId: number, req: VendaRequest): Observable<Venda> {
    return this.http.post<Venda>(`${this.baseUrl}?usuarioId=${usuarioId}`, req);
  }

  consultar(filtro: {
    usuarioId?: number | null;
    inicio?: string | null;
    fim?: string | null;
    valorMin?: number | null;
    valorMax?: number | null;
  }): Observable<Venda[]> {
    let params = new HttpParams();

    if (filtro.usuarioId) {
      params = params.set('usuarioId', filtro.usuarioId.toString());
    }
    if (filtro.inicio) {
      params = params.set('inicio', filtro.inicio);
    }
    if (filtro.fim) {
      params = params.set('fim', filtro.fim);
    }
    if (filtro.valorMin != null) {
      params = params.set('valorMin', filtro.valorMin.toString());
    }
    if (filtro.valorMax != null) {
      params = params.set('valorMax', filtro.valorMax.toString());
    }

    return this.http.get<Venda[]>(this.baseUrl, { params });
  }
}
