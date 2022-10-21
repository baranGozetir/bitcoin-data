import axios from "axios";
import RocksDB from "rocksdb";
import { TxDto } from "../DTO/TxDto";
import { TxRepository } from "../Repository/TxRepository";
import { IBusiness } from "./IBusiness";

export class TxBusiness implements IBusiness<TxDto> {
  result = new TxRepository();

  constructor() {
    this.open().then(() => {
      this.getTx();
    });
  }
  open = async () => await this.result.open();

  put = async (key: any, value: any) => this.result.put(key, value);

  get = async (key: string) => this.result.get(key);

  getMany = async (options?: RocksDB.IteratorOptions) =>
    await this.result.getMany(options);

  delete = async (key: string) => this.result.delete(key);

  deleteAll = async () => this.result.deleteAll();

  getTx = async () => {
    const allTxData = await this.getMany();
    allTxData.sort(
      (a, b) => a.val.status.block_height - b.val.status.block_height
    );
    console.log("txxler", allTxData[allTxData.length - 1]);

    if (allTxData.length === 0) {
      const blockHash = await axios(
        "https://blockstream.info/testnet/api/block-height/" + 0
      );
      const blocksTxsId = await axios(
        "https://blockstream.info/testnet/api/block/" +
          blockHash.data +
          "/txids"
      );
      blocksTxsId.data.forEach(async (element: string) => {
        const TxInfo = await axios(
          " https://blockstream.info/testnet/api/tx/" + element
        );
        let key = blocksTxsId.data;
        let data = TxInfo.data;
        await this.result.put(key, data);
      });
    } else {
      const lastTxData = await this.get(allTxData[allTxData.length - 1].key);
      if (lastTxData) {
        const lastBlockHeight = lastTxData.status.block_height;
        const blockHash = await axios(
          "https://blockstream.info/testnet/api/block-height/" +
            (lastBlockHeight + 1)
        );
        const blocksTxsId = await axios(
          "https://blockstream.info/testnet/api/block/" +
            blockHash.data +
            "/txids"
        );
        blocksTxsId.data.forEach(async (element: string) => {
          const TxInfo = await axios(
            " https://blockstream.info/testnet/api/tx/" + element
          );
          let key = blocksTxsId.data;
          let data = TxInfo.data;
          await this.result.put(key, data);
        });
      } else {
        ("there is no data");
      }
    }
  };
}
