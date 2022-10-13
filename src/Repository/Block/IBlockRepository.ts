import { Block } from "../../Entity/Block";
import { IRepository } from "../IRepository";

export interface IBlockRepository extends IRepository<Block> {
  getDocumentByBlockHeight: (param: string) => Promise<any>;
  getDocumentsByTxCount: () => Promise<any>;
}
