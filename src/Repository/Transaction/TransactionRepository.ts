import elasticClient from "../../elasticSearch/elastic-client";
import { Transaction } from "../../Entity/Transaction";
import { Repository } from "../Repository";
import { ITransactionRepository } from "./ITransactionRepository";

export class TransactionRepository extends Repository<Transaction> implements ITransactionRepository {
  extendedTableName: string = "";

  constructor(tableName: string) {
    super(tableName);
  }

  postTxDocuments = async (data: Transaction): Promise<any> => {
    return await elasticClient.index({
      index: this.extendedTableName,
      body: data,
    });
  };
}
