import elasticClient from "../elasticSearch/elastic-client";
import { IRepository } from "./IRepository";

export class Repository<T> implements IRepository<T> {
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  createIndice = async (): Promise<any> => {
    return await elasticClient.indices.create({ index: this.tableName });
  };

  postDocument = async (data?: T): Promise<any> => {
    return await elasticClient.index({
      index: this.tableName,
      body: data,
    });
  };

  deleteDocument = async (id: string): Promise<any> => {
    return await elasticClient.delete({
      index: this.tableName,
      id: id,
    });
  };

  getAllDocuments = async (): Promise<any> => {
    return await elasticClient.search({
      index: this.tableName,
      query: { match_all: {} },
    });
  };

  getFilteredDocuments = async (queryObject: any): Promise<any> => {
    return await elasticClient.search({
      index: this.tableName,
      query: queryObject,
    });
  };
}
