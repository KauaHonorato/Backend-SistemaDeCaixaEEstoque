// Autor: Pedro Sousa Assumpção <pedroheitor55@gmail.com>

export interface ItemVendaRequest {
  produtoId: number;
  quantidade: number;
}

export interface ItemVendaResponse {
  produtoNome: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

export interface VendaRequest {
  itens: ItemVendaRequest[];
  valorRecebido: number;
}

export interface Venda {
  id: number;
  usuarioNome: string;
  valorTotal: number;
  valorRecebido: number;
  troco: number;
  dataHora: string;
  itens: ItemVendaResponse[];
}

