import { NaturezaOperacao } from "../types/enums";

export interface CreateNfsePayload {
  companyId: ID;
  identificacao: IdentificacaoNfse;
  tomador: Tomador;
  servico: Servico;
}

/** @format uuid */
export type ID = string;

export interface Tomador {
  identificacao?: Identificacao;
  razaosocial?: string;
  endereco?: Endereco;
  contato?: Contato;
}

export interface Identificacao {
  /** @pattern ([0-9]{2}?[0-9]{3}?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}?[0-9]{3}?[0-9]{3}?[0-9]{2}) */
  cpfcnpj: string;
  inscricaomunicipal?: string;
}

export interface Contato {
  telefone: string;
  email: string;
}

export interface Endereco {
  endereco: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  codigoMunicipio: string;
  cidade?: string;
  uf?: string;
  cep?: string;
}

export interface Valores {
  valorServicos: number;
  valorDeducoes?: number;
  valorPis?: number;
  valorCofins?: number;
  valorInss?: number;
  valorIr?: number;
  valorCsll?: number;
  issRetido?: boolean;
  valorIss?: number;
  outrasRetencoes?: number;
  baseCalculo: number;
  aliquota?: number;
  valorLiquidoNfse?: number;
  valorIssRetido?: number;
  descontoCondicionado?: number;
  descontoIncondicionado?: number;
}

export interface Servico {
  valores: Valores;
  itemListaServico: string;
  codigoCnae?: string;
  codigoTributacaoMunicipio?: string;
  discriminacao: string;
  codigoMunicipio: string;
}

export interface IdentificacaoNfse {
  naturezaOperacao?: keyof typeof NaturezaOperacao;
  regimeEspecialTributacao?:
    | "Microempresa municipal"
    | "Estimativa"
    | "Sociedade de profissionais"
    | "Cooperativa";
  optanteSimplesNacional?: boolean;
  incetivadorCultural?: boolean;
  /** @format date-time */
  competencia: string;
}
