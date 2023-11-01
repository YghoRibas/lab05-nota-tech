import {
  BulkDeletionBodyTypes,
  EditPaymentBodyTypes,
  ListPaymentQueryType,
} from "../routes/payments";
import { BulkDeleteResponse, ListPaymentResponse } from "../services/payment";
import { CreateEditRecepient } from "./createEditPaymentBody";

export interface Service {
  create(payload: CreateEditRecepient): Promise<Payment>;
  list(filter: ListPaymentQueryType): Promise<ListPaymentResponse>;
  edit(payload: EditPaymentBodyTypes): Promise<Payment>;
  delete(payload: DeletePaymentParamTypes): Promise<void>;
  bulkDelete(payload: BulkDeletionBodyTypes): Promise<BulkDeleteResponse>;
}
