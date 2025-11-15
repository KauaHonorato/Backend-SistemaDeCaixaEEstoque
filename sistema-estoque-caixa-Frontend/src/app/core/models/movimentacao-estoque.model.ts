// Autor: Pedro Sousa Assumpção <pedroheitor55@gmail.com>

export type TipoMovimentacao = 'ENTRADA' | 'AJUSTE_POSITIVO' | 'AJUSTE_NEGATIVO';

export interface MovimentacaoEstoqueRequest {
  produtoId: number;
  tipo: TipoMovimentacao;
  quantidade: number;
  motivo: string;
}

export interface MovimentacaoEstoque {
  id: number;
  produtoNome: string;
  tipo: string;
  quantidade: number;
  dataHora: string;
  usuarioNome: string;
}
