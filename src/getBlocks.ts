import axios from "axios";
import rocksdb from "rocksdb";

export const getLastBlockHash = async () => {
  const initialBlockHeight: number = 0;
  const lastBlockHeight = await axios.get("https://blockstream.info/testnet/api/blocks/tip/height");
  console.log("1", lastBlockHeight.data);

  const db = rocksdb("src/block");

  const openPromise = new Promise<void>((resolve, reject) => {
    db.open({ createIfMissing: true, errorIfExists: false }, (err) => {
      if (err) {
        console.error("BaseProvider.constructor.db.open.error", err);
        reject(err);
      }
      resolve();
    });
  });
  await openPromise;

  const putPromise = new Promise<void>((resolve, reject) => {
    db.put("block", Buffer.from(JSON.stringify(lastBlockHeight.data)), { sync: true }, (err: Error | undefined) => {
      if (err) {
        console.error("RocksDbProvider.put.error", err);
        return reject(err);
      }
      return resolve();
    });
  });
  await putPromise;

  const getAllPromise = new Promise<void>((resolve, reject) => {
    db.get("block", (err: Error | undefined, val) => {
      if (err) {
        console.error("RocksDbProvider.get.error", err);
        return reject(err);
      }

      if (val) console.log("aeswd", val.toString());
      else return reject();
    });
  });
  await getAllPromise;

  // if (lastBlockHeight.data > initialBlockHeight) {
  //   for (let i = initialBlockHeight; i <= lastBlockHeight.data; i++) {
  //     const blockHeight = await axios.get(`https://blockstream.info/testnet/api/block-height/${i}`);
  //     console.log("blockHash", blockHeight.data);
  //     const blockHash = await axios.get(`https://blockstream.info/testnet/api/block/${blockHeight.data}`);
  //     console.log("dataInformation", blockHash.data);
  //   }
  // }
};

getLastBlockHash();
