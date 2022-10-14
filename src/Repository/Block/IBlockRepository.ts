import { Block } from "../../Entity/Block";
import { IRepository } from "../IRepository";

export interface IBlockRepository extends IRepository<Block> {
  getDocumentByBlockHeight: (blockHeight: string) => Promise<any>;
  getDocumentsByTxCount: (gte: number, lte: number) => Promise<any>;
}
