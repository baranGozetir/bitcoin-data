import axios from "axios";
import RocksDB from "rocksdb";
import { TxDto } from "../DTO/TxDto";
import { TxRepository } from "../Repository/TxRepository";
import { IBusiness } from "./IBusiness";

export class TxBusiness implements IBusiness<TxDto> {
  result = new TxRepository();

  constructor() {}
  open = async () => await this.result.open();

  put = async (key: any, value: any) => this.result.put(key, value);

  get = async (key: string) => this.result.get(key);

  getMany = async (options?: RocksDB.IteratorOptions) =>
    await this.result.getMany(options);

  delete = async (key: string) => this.result.delete(key);

  deleteAll = async () => this.result.deleteAll();
}
