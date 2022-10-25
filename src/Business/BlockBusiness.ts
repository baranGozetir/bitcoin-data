import axios from "axios";
import RocksDB from "rocksdb";
import cron from "node-cron";
import { BlockDto } from "../DTO/BlockDto";
import { BlockRepository } from "../Repository/BlockRepository";
import { IBusiness } from "./IBusiness";
import { keyIn } from "readline-sync";

export class BlockBusiness implements IBusiness<BlockDto> {
  result = new BlockRepository();
  constructor() {}

  // databasela haberlesmemi sagliyo.
  open = async () => this.result.open();

  // database key value olarak kaydetmemi sagliyo
  put = async (key: any, value: any) => this.result.put(key, value);

  // databasede belli bir key oldugu zaman onu cekmemi sagliyo.
  get = async (key: string) => this.result.get(key);

  // databasedeki butun datalari cekmemi sagliyo
  getMany = async (options?: RocksDB.IteratorOptions) => {
    const allBlockData = await this.result.getMany(options);
    return allBlockData.sort((a, b) => a.val.height - b.val.height);
  };

  // databasede belli bir key degerine gore datayi silmemi sagliyo.
  delete = async (key: string) => this.result.delete(key);

  // tum tabloyu ucuruyo
  deleteAll = async () => this.result.deleteAll();
}
