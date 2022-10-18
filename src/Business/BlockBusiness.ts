import axios from "axios";
import RocksDB from "rocksdb";
import { BlockDto } from "../DTO/BlockDto";
import { BlockRepository } from "../Repository/BlockRepository";
import { IBusiness } from "./IBusiness";

export class BlockBusiness implements IBusiness<BlockDto> {
  result = new BlockRepository();
  constructor() {
    this.open();
    this.fetchBlock();
  }

  fetchBlock = async (i = 0): Promise<any> => {
    if (i > 5) {
      return console.log("too much data");
    } else {
      const blockhash = [];
      const blockHash = await axios(
        "https://blockstream.info/testnet/api/block-height/" + i
      );
      blockhash.push(await this.result.put(blockHash.data, blockHash.data));

      return this.fetchBlock(i + 1);
    }
  };

  open = async () => await this.result.open();

  // put = async () => {
  //   let blokhash = [];
  //   let blockData = [];

  //   for (let i = 0; i <= 5; i++) {
  //     const blockHash = await axios.get(
  //       "https://blockstream.info/testnet/api/block-height/" + i
  //     );
  //     blokhash.push(blockHash.data);
  //     const blockInfo = await axios.get(
  //       "https://blockstream.info/testnet/api/block/" + blokhash[i]
  //     );

  //     blockData.push(
  //       await this.result.put(blockInfo.data.height, blockInfo.data)
  //     );
  //   }
  //   return blockData;
  // };

  put = async (key: any, value: any) => this.result.put(key, value);

  get = async (key: string) => this.result.get(key);

  getMany = async (options?: RocksDB.IteratorOptions) =>
    await this.result.getMany(options);

  delete = async (key: string) => this.result.delete(key);

  deleteAll = async () => this.result.deleteAll();
}
