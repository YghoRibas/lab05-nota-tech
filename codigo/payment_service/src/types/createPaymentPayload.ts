import { PaymentStatus, PaymentType, Servico } from "./payment";

export interface CreatePaymentPayload {
  clientId: string;
  companyId: string;
  servico: Servico;
  status: PaymentStatus;
  tipo: PaymentType;
}
