import {
  BulkDeletionBodyTypes,
  EditNFSeBodyTypes,
  ListNFSeQueryType,
} from "../routes/nfses";
import { BulkDeleteResponse, ListNFSeResponse } from "../services/nfse";
import { CreateEditRecepient } from "./createEditNFSeBody";

export interface Service {
  create(payload: CreateEditRecepient): Promise<NFSe>;
  list(filter: ListNFSeQueryType): Promise<ListNFSeResponse>;
  edit(payload: EditNFSeBodyTypes): Promise<NFSe>;
  delete(payload: DeleteNFSeParamTypes): Promise<void>;
  bulkDelete(payload: BulkDeletionBodyTypes): Promise<BulkDeleteResponse>;
}
