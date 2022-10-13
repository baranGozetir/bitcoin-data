import RocksDB from "rocksdb";

export interface IBusiness<T> {
  createIndice: () => Promise<any>;
  postDocument: (data: T) => Promise<any>;
  deleteDocument: (id: string) => Promise<any>;
  getAllDocuments: () => Promise<any>;
}
