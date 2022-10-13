import axios from "axios";
import { BlockDto } from "../DTO/BlockDto";
import { BlockRepository } from "../Repository/Block/BlockRepository";
import { IBusiness } from "./IBusiness";

export class BlockBusiness implements IBusiness<BlockDto> {
  result = new BlockRepository("block2");

  constructor() {
    this.createIndice();
  }

  createIndice = async (): Promise<any> => await this.result.createIndice();

  postDocument = async (): Promise<any> => {
    let blokHashArray = [];

    for (let i = 0; i < 5; i++) {
      //for (let i = initialBlockHeight; i < lastBlockHeight.data.length; i++)
      const blockHash = await axios.get("https://blockstream.info/testnet/api/block-height/" + i);
      blokHashArray.push(blockHash.data);
      const blockInfo = await axios.get("https://blockstream.info/testnet/api/block/" + blokHashArray[i]);
      await this.result.postDocument(blockInfo.data);
    }
  };

  deleteDocument = async (id: string): Promise<any> => await this.result.deleteDocument(id);

  getAllDocuments = async (): Promise<any> => await this.result.getAllDocuments();

  getDocumentByBlockHeight = async (param: string): Promise<any> => await this.result.getDocumentByBlockHeight(param);

  getDocumentsByTxCount = async (): Promise<any> => await this.result.getDocumentsByTxCount();
}
