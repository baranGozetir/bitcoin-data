import axios from "axios";
import RocksDB from "rocksdb";
import { BlocksTxDto } from "../DTO/BlocksTxDto";
import { BlocksTxRepository } from "../Repository/BlocksTxRepository";
import { IBusiness } from "./IBusiness";

export class BlocksTxBusiness implements IBusiness<BlocksTxDto> {
  result = new BlocksTxRepository();

  constructor() {
    this.open();
  }

  open = async () => await this.result.open();

  put = async () => {
    let blokhash = [];
    let blockData = [];
    // const lastBlockHeight = await axios(
    //   "https://blockstream.info/testnet/api/blocks/tip/height"
    // );
    for (let i = 0; i <= 5; i++) {
      //for (let i = initialBlockHeight; i < lastBlockHeight.data.length; i++)
      const blockHash = await axios.get(
        "https://blockstream.info/testnet/api/block-height/" + i
      );
      blokhash.push(blockHash.data);

      const blockInfo = await axios.get(
        "https://blockstream.info/testnet/api/block/" + blokhash[i] + "/txids"
      );
      blockData.push(await this.result.put(blockInfo.data, blockInfo.data));
      //console.log("11111", blockInfo.data);
    }
    //console.log(blockData);
    return blockData;
  };

  get = async (key: string) => this.result.get(key);

  getMany = async (options?: RocksDB.IteratorOptions) =>
    await this.result.getMany(options);

  delete = async (key: string) => this.result.delete(key);

  deleteAll = async () => this.result.deleteAll();
}
