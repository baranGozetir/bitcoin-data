import axios from "axios";
import RocksDB from "rocksdb";
import { Block } from "../Entity/Block";
import { BlockRepository } from "../Repository/BlockRepository";
import { IBusiness } from "./IBusiness";

export class BlockBusiness implements IBusiness<Block> {
  result = new BlockRepository();

  open = async () => await this.result.open();

  put = async () => {
    let initialBlockHeight: number = 0;
    const lastBlockHeight = await axios.get("https://blockstream.info/testnet/api/blocks/tip/height");

    if (lastBlockHeight.data > initialBlockHeight) {
      //for (let i = initialBlockHeight; i < lastBlockHeight.data.length; i++) {
      for (let i = initialBlockHeight; i <= 3; i++) {
        const blockHeight = await axios.get(`https://blockstream.info/testnet/api/block-height/${i}`);

        return await this.result.put(blockHeight.data, blockHeight.data);
      }
    }
  };

  get = async (key: string) => this.result.get(key);

  getMany = async (options?: RocksDB.IteratorOptions) => await this.result.getMany(options);

  delete = async (key: string) => this.result.delete(key);

  deleteAll = async () => this.result.deleteAll();
}
