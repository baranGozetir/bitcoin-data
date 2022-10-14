import elasticClient from "../../elasticSearch/elastic-client";
import { Block } from "../../Entity/Block";
import { IBlockRepository } from "./IBlockRepository";

export class BlockRepository implements IBlockRepository {
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  createIndice = async (): Promise<any> => {
    return await elasticClient.indices.create({ index: this.tableName });
  };

  postDocument = async (data: Block): Promise<any> => {
    return await elasticClient.index({
      index: this.tableName,
      body: data,
    });
  };

  deleteDocument = async (id: string): Promise<any> => {
    console.log(id);
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

  //https://coralogix.com/blog/42-elasticsearch-query-examples-hands-on-tutorial/
  getDocumentByBlockHeight = async (blockHeight: string): Promise<any> => {
    return await elasticClient.search({
      index: this.tableName,
      query: {
        match: { height: blockHeight },
      },
    });
  };

  getDocumentsByTxCount = async (gte: number, lte: number): Promise<any> => {
    return await elasticClient.search({
      index: this.tableName,
      query: { range: { tx_count: { gte: gte, lte: lte } } },
    });
  };
}
