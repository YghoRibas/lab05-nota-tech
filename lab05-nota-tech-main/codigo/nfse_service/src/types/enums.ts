/** Código de natureza da operação */
export enum NaturezaOperacao {
  "Tributação no município" = 1,
  "Tributação fora do município" = 2,
  "Isenção" = 3,
  "Imune" = 4,
  "Exigibilidade suspensa por decisão judicial" = 5,
  "Exigibilidade suspensa por procedimento administrativo" = 6,
}

/** Código de identificação do regime especial de tributação */
export enum RegimeEspecialTributacao {
  "Microempresa municipal" = 1,
  "Estimativa" = 2,
  "Sociedade de profissionais" = 3,
  "Cooperativa" = 4,
}

/** Código de status do RPS */
export enum StatusRPS {
  "Normal" = 1,
  "Cancelado" = 2,
}

/** Código de status da NFS-e */
export enum StatusNfse {
  "Normal" = 1,
  "Cancelado" = 2,
}

/** Código de tipo de RPS */
export enum TipoRPS {
  "RPS" = 1,
  "Nota Fiscal Conjugada (Mista)" = 2,
  "Cupom" = 3,
}

/** Código de situação de lote de RPS */
export enum SituacaoLoteRps {
  "Não Recebido" = 1,
  "Não Processado" = 2,
  "Processado com Erro" = 3,
  "Código de status do RPS" = 4,
}

/** Identificação de Sim/Não */
export enum SimNao {
  "Sim" = 1,
  "Nao" = 2,
}
