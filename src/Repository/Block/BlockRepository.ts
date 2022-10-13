import elasticClient from "../../elasticSearch/elastic-client";
import { Block } from "../../Entity/Block";
import { IBlockRepository } from "./IBlockRepository";

export class BlockRepository implements IBlockRepository {
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  createIndice = async (): Promise<any> => {
    await elasticClient.indices.create({ index: this.tableName });
  };

  postDocument = async (data: Block): Promise<any> => {
    await elasticClient.index({
      index: this.tableName,
      body: data,
    });
  };

  deleteDocument = async (id: string): Promise<any> => {
    await elasticClient.delete({
      index: this.tableName,
      id: id,
    });
  };

  getAllDocuments = async (): Promise<any> => {
    await elasticClient.search({
      index: this.tableName,
      query: { match_all: {} },
    });
  };

  //https://coralogix.com/blog/42-elasticsearch-query-examples-hands-on-tutorial/
  getDocumentByBlockHeight = async (param: string): Promise<any> => {
    await elasticClient.search({
      index: this.tableName,
      query: { fuzzy: { height: param } },
    });
  };

  getDocumentsByTxCount = async (): Promise<any> => {
    await elasticClient.search({
      index: this.tableName,
      query: { range: { tx_count: { gte: 5, lte: 10 } } },
    });
  };
}
