import RocksDB from "rocksdb";

export interface IRepository<T> {
  get: (key: string) => Promise<T | undefined>;
  put: (key: string, value: T) => Promise<T>;
  del: (key: string) => Promise<string>;
  getMany: (options?: RocksDB.IteratorOptions) => Promise<{ key: string; val: T }[]>;
  deleteAll: () => Promise<void>;
}
