import rocksdb from "rocksdb";
import RocksDB from "rocksdb";
import { Block } from "../Entity/Block";
import { IRepository } from "./Interface/IRepository";
import { Repository } from "./Repository";

export class BlockRepository implements IRepository<Block> {
  db = rocksdb("src/block");
  result = new Repository<Block>(this.db);

  open = (resolve: () => void, reject: (arg0: Error) => void): Promise<void> => {
    return this.result.open(resolve, reject);
  };

  get = (key: string): Promise<Block | undefined> => {
    return this.result.get(key);
  };

  put = (key: string, value: Block): Promise<Block> => {
    return this.result.put(key, value);
  };

  del = (key: string): Promise<string> => {
    return this.result.del(key);
  };

  getMany = (options?: RocksDB.IteratorOptions): Promise<{ key: string; val: Block }[]> => {
    return this.result.getMany(options);
  };

  deleteAll = (): Promise<void> => {
    return this.result.deleteAll();
  };
}
