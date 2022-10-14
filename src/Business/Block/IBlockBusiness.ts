import { IBusiness } from "../IBusiness";

export interface IBlockBusiness<T> extends IBusiness<T> {
  getDocumentByBlockHeight: (blockHeight: string) => Promise<any>;
  getDocumentsByTxCount: (gte: number, lte: number) => Promise<any>;
}
