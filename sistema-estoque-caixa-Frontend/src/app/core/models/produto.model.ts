// Autor: Pedro Sousa Assumpção <pedroheitor55@gmail.com>

export interface Produto {
  id: number;
  codigo: string;
  nome: string;
  categoria?: string | null;
  quantidadeEstoque: number;
  precoUnitario: number;
}

export interface ProdutoRequest {
  codigo: string;
  nome: string;
  categoria?: string | null;
  quantidadeEstoque: number;
  precoUnitario: number;
}
