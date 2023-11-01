import { Uf } from "./commons";

export interface Company {
  id: string;
  companyName: string;
  cnpj: string;
  municipalRegistry?: string;
  address: Endereco;
  regimeEspecialTributacao: string;
  optanteSimplesNacional: boolean;
  incetivadorCultural: boolean;
  contato: Contato;
}

export interface Contato {
  telefone: string;
  email: string;
}

export interface Endereco {
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  codigoMunicipio: string;
  cidade?: string;
  uf?: Uf;
  cep?: string;
}
