import RocksDB from "rocksdb";

export interface IBusiness<T> {
  open: () => Promise<void>;
  get: (key: string) => Promise<T | undefined>;
  put: () => Promise<void>;
  delete: (key: string) => Promise<string>;
  getMany: (options?: RocksDB.IteratorOptions) => Promise<{ key: string; val: T }[]>;
  deleteAll: () => Promise<void>;
}
