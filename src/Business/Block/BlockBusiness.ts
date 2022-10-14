import axios from "axios";
import { Block } from "../../Entity/Block";
import { BlockRepository } from "../../Repository/Block/BlockRepository";
import { Business } from "../Business";
import { IBlockBusiness } from "./IBlockBusiness";

export class BlockBusiness<BlockDto> extends Business<BlockDto> implements IBlockBusiness<BlockDto> {
  private instancea: BlockRepository<Block>;

  constructor() {
    super("block2");
    this.instancea = new BlockRepository<Block>("block2");
  }

  postDocument = async (): Promise<any> => {
    let blocksHashArray = [];
    let blocksArray = [];

    for (let i = 0; i < 10; i++) {
      //for (let i = initialBlockHeight; i < lastBlockHeight.data.length; i++)
      const blockHash = await axios.get("https://blockstream.info/testnet/api/block-height/" + i);
      blocksHashArray.push(blockHash.data);
      const blockInfo = await axios.get("https://blockstream.info/testnet/api/block/" + blocksHashArray[i]);
      blocksArray.push(await super.postDocument(blockInfo.data));
    }

    return blocksArray;
  };

  deleteDocument = async (blockHeight: string): Promise<any> => {
    const blockElasticIdPromise = await this.getDocumentByBlockHeight(blockHeight);
    return await this.instancea.deleteDocument(blockElasticIdPromise.hits.hits[0]._id);
  };

  getDocumentByBlockHeight = async (blockHeight: string): Promise<any> => {
    return await this.instancea.getDocumentByBlockHeight(blockHeight);
  };

  getDocumentsByTxCount = async (gte: number, lte: number): Promise<any> => await this.instancea.getDocumentsByTxCount(gte, lte);
}
