import { Block } from "../../Entity/Block";
import { IRepository } from "../IRepository";

export interface IBlockRepository<Block> extends IRepository<Block> {
  extendedTableName: string;
}
