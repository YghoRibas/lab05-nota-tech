import { NfseStatus } from "./nfse";

export interface ListFilters {
  page?: number;
  orderBy?: "asc" | "desc";
  sortBy?: string;
  limit?: number;
}

export interface ListNfseFilter extends ListFilters {
  companyId: string;
  numero?: number;
  competencia?: string;
  status?: NfseStatus;
}
