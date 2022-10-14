import { Block } from "../../Entity/Block";
import { IRepository } from "../IRepository";

export interface IBlockRepository<Block> extends IRepository<Block> {
  extendedTableName: string;
  getDocumentByBlockHeight: (blockHeight: string) => Promise<any>;
  getDocumentsByTxCount: (gte: number, lte: number) => Promise<any>;
}
