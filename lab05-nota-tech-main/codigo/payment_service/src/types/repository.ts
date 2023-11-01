import { PaymentStatus } from "./payment";

export interface ListFilters {
  page?: number;
  orderBy?: "asc" | "desc";
  sortBy?: string;
  limit?: number;
}

export interface ListPaymentFilter extends ListFilters {
  companyId: string;
  status?: PaymentStatus;
}
