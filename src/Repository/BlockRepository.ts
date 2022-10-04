import rocksdb from "rocksdb";
import RocksDB from "rocksdb";
import { Block } from "../Entity/Block";
import { IRepository } from "./Interface/IRepository";
import { Repository } from "./Repository";

export class BlockRepository implements IRepository<Block> {
  db = rocksdb("src/block");
  result = new Repository<Block>(this.db);

  open = (resolve: () => void, reject: (arg0: Error) => void): Promise<void> => this.result.open(resolve, reject);

  get = (key: string): Promise<Block | undefined> => this.result.get(key);

  put = (key: string, value: Block): Promise<Block> => this.result.put(key, value);

  del = (key: string): Promise<string> => this.result.del(key);

  getMany = (options?: RocksDB.IteratorOptions): Promise<{ key: string; val: Block }[]> => this.result.getMany(options);

  deleteAll = (): Promise<void> => this.result.deleteAll();
}
