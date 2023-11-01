export type PaymentStatus = 'PENDING' | 'PAID'

export interface Payment {
  _id: number;
  status: PaymentStatus;
}

export function paymentStatus(payment: Payment) {
  switch(payment.status){
    case 'PENDING':
      return 'Pendente'

    case 'PAID':
      return 'Pago';
  }

  return '[INVALIDO]'
}