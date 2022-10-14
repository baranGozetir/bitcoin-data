import { TransactionDto } from "../../DTO/TransactionDto";
import { Transaction } from "../../Entity/Transaction";
import { IBusiness } from "../IBusiness";

export interface ITransactionBusiness<TransactionDto> extends IBusiness<TransactionDto> {
  postTxDocuments: () => Promise<any>;
}
