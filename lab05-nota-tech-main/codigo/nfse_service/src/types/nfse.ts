import { Uf } from "../interfaces/commons";
import { NaturezaOperacao, RegimeEspecialTributacao, SimNao } from "./enums";

export interface INfse {
  id: string;
  status: NfseStatus;
  identificacao: IIdentificacaoNfse;
  prestador: IIdentificacaoActors;
  tomador: IIdentificacaoActors;
  servico: Servico;
  orgaoGerador?: IOrgaogerador;
}

export enum NfseStatus {
  SENT = "ENVIADO",
  EMITTED = "EMITIDO",
  CANCELLED = "CANCELADO",
  ERROR = "ERROR",
}

export interface IIdentificacaoNfse {
  numero?: string;
  codigoVerificacao?: string;
  dataemissao?: string;
  naturezaOperacao: NaturezaOperacao;
  regimeEspecialTributacao: RegimeEspecialTributacao;
  optanteSimplesNacional: SimNao;
  incetivadorCultural: SimNao;
  competencia: string;
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

export interface IIdentificacaoActors {
  id?: string;
  identificacao: IIdentificacao;
  razaosocial: string;
  endereco: IEndereco;
  contato: IContato;
}

export interface IContato {
  telefone: string;
  email: string;
}

export interface IIdentificacao {
  cpfcnpj: ICpfcnpj;
  inscricaomunicipal?: string;
}

export interface ICpfcnpj {
  cnpj?: string;
  cpf?: string;
}

export interface IEndereco {
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  codigoMunicipio: string;
  cidade?: string;
  uf?: Uf;
  cep?: string;
}

export interface IOrgaogerador {
  codigomunicipio: string;
  name: string;
}
