import axios from "axios";
import { BlockDto } from "../DTO/BlockDto";
import { BlockRepository } from "../Repository/Block/BlockRepository";
import { IBusiness } from "./IBusiness";

export class BlockBusiness implements IBusiness<BlockDto> {
  result = new BlockRepository("block2");

  createIndice = async (): Promise<any> => await this.result.createIndice();

  postDocument = async (): Promise<any> => {
    let blocksHashArray = [];
    let blocksArray = [];

    for (let i = 0; i < 10; i++) {
      //for (let i = initialBlockHeight; i < lastBlockHeight.data.length; i++)
      const blockHash = await axios.get("https://blockstream.info/testnet/api/block-height/" + i);
      blocksHashArray.push(blockHash.data);
      const blockInfo = await axios.get("https://blockstream.info/testnet/api/block/" + blocksHashArray[i]);
      blocksArray.push(await this.result.postDocument(blockInfo.data));
    }

    return blocksArray;
  };

  deleteDocument = async (blockHeight: string): Promise<any> => {
    const blockElasticIdPromise = await this.result.getDocumentByBlockHeight(blockHeight);
    return await this.result.deleteDocument(blockElasticIdPromise.hits.hits[0]._id);
  };

  getAllDocuments = async (): Promise<any> => await this.result.getAllDocuments();

  getDocumentByBlockHeight = async (blockHeight: string): Promise<any> => {
    return await this.result.getDocumentByBlockHeight(blockHeight);
  };

  getDocumentsByTxCount = async (gte: number, lte: number): Promise<any> => await this.result.getDocumentsByTxCount(gte, lte);
}
