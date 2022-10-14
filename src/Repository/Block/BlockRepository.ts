import elasticClient from "../../elasticSearch/elastic-client";
import { Block } from "../../Entity/Block";
import { Repository } from "../Repository";
import { IBlockRepository } from "./IBlockRepository";

export class BlockRepository<Block> extends Repository<Block> implements IBlockRepository<Block> {
  extendedTableName: string = "";

  constructor(tableName: string) {
    super(tableName);
  }
}
