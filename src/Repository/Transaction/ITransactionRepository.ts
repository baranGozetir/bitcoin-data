import { Transaction } from "../../Entity/Transaction";
import { IRepository } from "../IRepository";

export interface ITransactionRepository extends IRepository<Transaction> {
  extendedTableName: string;
  postTxDocuments: (data: Transaction) => Promise<any>;
}
