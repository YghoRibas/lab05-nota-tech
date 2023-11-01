import { ObjectId } from "mongodb";

export enum NfseStatus {
  SENT = "ENVIADO",
  EMITTED = "EMITIDO",
  CANCELLED = "CANCELADO",
  ERROR = "ERROR",
}

export enum PaymentType {
  NORMAL = "NORMAL",
  PIX = "PIX",
}

export interface IPayment {
  _id: ObjectId;
  companyId: string;
  client: string;
  servico: Servico;
  status: PaymentStatus;
  tipo: PaymentType;
  nfse?: {
    status: NfseStatus;
    id: string;
  };
}

export enum PaymentStatus {
  PAID = "PAGO",
  PENDING = "PENDENTE",
}

export interface Valores {
  valorServicos: number;
  baseCalculo: number;
  aliquota?: number;
}

export interface Servico {
  valores: Valores;
  itemListaServico: string;
  codigoCnae?: string;
  codigoTributacaoMunicipio?: string;
  discriminacao: string;
  codigoMunicipio: string;
}
