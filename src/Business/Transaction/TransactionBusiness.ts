import axios from "axios";
import { Transaction } from "../../Entity/Transaction";
import { TransactionRepository } from "../../Repository/Transaction/TransactionRepository";
import { Business } from "../Business";
import { ITransactionBusiness } from "./ITransactionBusiness";

export class TransactionBusiness<TransactionDto> extends Business<TransactionDto> implements ITransactionBusiness<TransactionDto> {
  private instancea: TransactionRepository;

  constructor() {
    super("transaction");
    this.instancea = new TransactionRepository("transaction");
  }

  postTxDocuments = async () => {
    const tx = await axios.get("https://blockstream.info/testnet/tx/f0315ffc38709d70ad5647e22048358dd3745f3ce3874223c80a7c92fab0c8ba");
    console.log(tx);
    //return await this.instancea.postTxDocuments(data);
  };

  deleteDocument = async (blockHeight: string): Promise<any> => {
    //const blockElasticIdPromise = await this.getDocumentByBlockHeight(blockHeight);
    //return await this.instancea.deleteDocument(blockElasticIdPromise.hits.hits[0]._id);
    return await this.instancea.deleteDocument("_id");
  };
}
