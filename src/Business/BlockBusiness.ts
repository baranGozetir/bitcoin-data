import axios from "axios";
import RocksDB from "rocksdb";
import cron from "node-cron";
import { BlockDto } from "../DTO/BlockDto";
import { BlockRepository } from "../Repository/BlockRepository";
import { IBusiness } from "./IBusiness";
import { keyIn } from "readline-sync";

export class BlockBusiness implements IBusiness<BlockDto> {
  result = new BlockRepository();
  constructor() {
    this.open().then(() => {
      this.fetchBlock();
    });
  }
  // databasela haberlesmemi sagliyo.
  open = async () => this.result.open();

  // database key value olarak kaydetmemi sagliyo
  put = async (key: any, value: any) => this.result.put(key, value);

  // databasede belli bir key oldugu zaman onu cekmemi sagliyo.
  get = async (key: string) => this.result.get(key);

  // databasedeki butun datalari cekmemi sagliyo
  getMany = async (options?: RocksDB.IteratorOptions) =>
    this.result.getMany(options);

  // databasede belli bir key degerine gore datayi silmemi sagliyo.
  delete = async (key: string) => this.result.delete(key);

  // tum tabloyu ucuruyo
  deleteAll = async () => this.result.deleteAll();

  fetchBlock = async () => {
    const allData = await this.getMany();
    allData.sort((a, b) => a.val.height - b.val.height);

    if (allData.length === 0) {
      const blockHash = await axios(
        "https://blockstream.info/testnet/api/block-height/" + 0
      );
      const blockData = await axios(
        "https://blockstream.info/testnet/api/block/" + blockHash.data
      );
      let key = blockHash.data;
      let data = blockData.data;

      await this.result.put(key, data);
    } else {
      const lastData = await this.get(allData[allData.length - 1].key);
      if (lastData) {
        const blockHash = await axios(
          "https://blockstream.info/testnet/api/block-height/" +
            (lastData.height + 1)
        );

        const blockData = await axios(
          "https://blockstream.info/testnet/api/block/" + blockHash.data
        );
        let key = blockHash.data;
        let data = blockData.data;
        await this.result.put(key, data);
      } else {
        console.log("there is no last data information");
      }
    }
    console.log("111", allData);

    //this.fetchBlock();
  };
}
