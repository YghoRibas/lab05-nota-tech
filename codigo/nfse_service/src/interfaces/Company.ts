import { RegimeEspecialTributacao } from "../types/enums";
import { IEndereco } from "../types/nfse";

export interface Company {
  id: string;
  companyName: string;
  cnpj: string;
  municipalRegistry?: string;
  address: IEndereco;
  regimeEspecialTributacao: RegimeEspecialTributacao;
  optanteSimplesNacional: boolean;
  incetivadorCultural: boolean;
  contato: IContato;
}

export interface IContato {
  telefone: string;
  email: string;
}
