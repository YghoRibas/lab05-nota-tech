export type NfseStatus = 'ENVIADO' | 'EMITIDA' | 'CANCELADO'

export interface Nfse {
  id: number;
  status: NfseStatus;
  identificacao: {
    competencia: string;
    numero: number;
  };
  prestador: {
    razaosocial: string;
  },
  tomador: {
    razaosocial: string;
  }
}

export function nfseStatus(nfse: Nfse) {
  switch(nfse.status){
    case 'ENVIADO':
      return 'Enviado'

    case 'EMITIDA':
      return 'Emitida';

    case 'CANCELADO':
      return 'Cancelado'
  }

  return '[INVALIDO]'
}