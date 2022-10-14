import elasticClient from "../../elasticSearch/elastic-client";
import { Block } from "../../Entity/Block";
import { Repository } from "../Repository";
import { IBlockRepository } from "./IBlockRepository";

export class BlockRepository<Block> extends Repository<Block> implements IBlockRepository<Block> {
  extendedTableName: string = "";

  constructor(tableName: string) {
    super(tableName);
  }

  //https://coralogix.com/blog/42-elasticsearch-query-examples-hands-on-tutorial/
  getDocumentByBlockHeight = async (blockHeight: string): Promise<any> => {
    return await elasticClient.search({
      index: this.extendedTableName,
      query: {
        match: { height: blockHeight },
      },
    });
  };

  getDocumentsByTxCount = async (gte: number, lte: number): Promise<any> => {
    return await elasticClient.search({
      index: this.extendedTableName,
      query: { range: { tx_count: { gte: gte, lte: lte } } },
    });
  };
}
