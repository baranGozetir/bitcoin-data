import axios from "axios";
import RocksDB from "rocksdb";
import { TxDto } from "../DTO/TxDto";
import { TxRepository } from "../Repository/TxRepository";
import { IBusiness } from "./IBusiness";

export class TxBusiness implements IBusiness<TxDto> {
  result = new TxRepository();

  constructor() {
    this.open();
  }

  open = async () => await this.result.open();

  put = async () => {
    let txData = [];
    const txInfo = await axios(
      "https://blockstream.info/testnet/api//tx/34ce3a0137fa5677caacaae9347e9c94020d8511dda5b0bebac7b87a01a9a51a"
    );
    txData.push(await this.result.put(txInfo.data, txInfo.data));
    return txData;
  };

  get = async (key: string) => this.result.get(key);

  getMany = async (options?: RocksDB.IteratorOptions) =>
    await this.result.getMany(options);

  delete = async (key: string) => this.result.delete(key);

  deleteAll = async () => this.result.deleteAll();
}
