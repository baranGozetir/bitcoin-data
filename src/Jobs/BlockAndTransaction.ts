import { BlockBusiness } from "../Business/BlockBusiness";
import { TxBusiness } from "../Business/TxBusiness";
import axios from "axios";
import cron from "node-cron";

export class BlockAndTransaction {
  blockInstance: BlockBusiness;
  txInstance: TxBusiness;

  constructor() {
    this.blockInstance = new BlockBusiness();
    this.txInstance = new TxBusiness();
    this.openData()
      .then(() => {
        this.blockAndTransactionSave();
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  openData = async () => {
    await this.blockInstance.open();
    await this.txInstance.open();
  };
  blockAndTransactionSave = async () => {
    const allBlockData = await this.blockInstance.getMany();
    const allTxData = await this.txInstance.getMany();
    console.log("blockdata", allBlockData);
    //console.log("txdata", allTxData);

    if (allBlockData.length === 0) {
      const blockHash = await axios(
        "https://blockstream.info/testnet/api/block-height/" + 2378400
      );

      const blockData = await axios(
        "https://blockstream.info/testnet/api/block/" + blockHash.data
      );

      const blocksTxsId = await axios(
        "https://blockstream.info/testnet/api/block/" +
          blockHash.data +
          "/txids"
      );

      const transactionPromises = blocksTxsId.data.map(
        async (element: string) => {
          return axios(" https://blockstream.info/testnet/api/tx/" + element);
        }
      );
      const transactionData = await Promise.all(transactionPromises);

      let blockKey = blockHash.data;
      let blockValue = blockData.data;

      await this.blockInstance.put(blockKey, blockValue);

      const transactionDataPromises = transactionData.map(
        async (element: any) => {
          let txKey = element.data.txid;
          let txValue = element.data;
          return this.txInstance.put(txKey, txValue);
        }
      );
      await Promise.all(transactionDataPromises);
    } else {
      const lastData = await this.blockInstance.get(
        allBlockData[allBlockData.length - 1].key
      );
      if (lastData) {
        const lastBlockHeight = await axios(
          " https://blockstream.info/testnet/api/blocks/tip/height"
        );

        const lastBlockHeightInData = lastData.height;
        if (lastBlockHeightInData >= lastBlockHeight.data) {
          return lastBlockHeightInData;
        } else {
          const blockHash = await axios(
            "https://blockstream.info/testnet/api/block-height/" +
              (lastData.height + 1)
          );

          const blockData = await axios(
            "https://blockstream.info/testnet/api/block/" + blockHash.data
          );

          const blocksTxsId = await axios(
            "https://blockstream.info/testnet/api/block/" +
              blockHash.data +
              "/txids"
          );
          const transactionPromises = blocksTxsId.data.map(
            async (element: string) => {
              return axios(
                " https://blockstream.info/testnet/api/tx/" + element
              );
            }
          );
          const transactionData = await Promise.all(transactionPromises);

          let blockKey = blockHash.data;
          let blockValue = blockData.data;

          await this.blockInstance.put(blockKey, blockValue);

          const transactionDataPromises = transactionData.map(
            async (element: any) => {
              let txKey = element.data.txid;
              let txValue = element.data;
              return this.txInstance.put(txKey, txValue);
            }
          );
          await Promise.all(transactionDataPromises);
        }
      } else {
        console.log("there is no data");
      }
    }
    this.blockAndTransactionSave();
  };
}
