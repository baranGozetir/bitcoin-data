export interface IRepository<T> {
  createIndice: () => Promise<any>;
  postDocument: (data: T) => Promise<any>;
  deleteDocument: (id: string) => Promise<any>;
  getAllDocuments: () => Promise<any>;
}
