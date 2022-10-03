import axios from "axios";
import rocksdb from "rocksdb";
const db = rocksdb("src/block");

export const getLastBlockHash = async () => {
  const initialBlockHeight: number = 0;
  const lastBlockHeight = await axios.get("https://blockstream.info/testnet/api/blocks/tip/height");
  //console.log("1", lastBlockHeight.data);
  //console.log('length', lastBlockHeight.data.length)

  if (lastBlockHeight.data > initialBlockHeight) {
    for (let i = initialBlockHeight; i <= 1; i++) {
      const blockHeight = await axios.get(`https://blockstream.info/testnet/api/block-height/${i}`);
      console.log("blockHash", blockHeight.data);

      

      const openPromise = new Promise<void>((resolve, reject) => {
        db.open({ createIfMissing: true, errorIfExists: false }, (err: Error | undefined) => {
          if (err) {
            console.error("BaseProvider.constructor.db.open.error", err);
            reject(err);
          }
          resolve()
        });
      });
      await openPromise;

      const putPromise = new Promise<void>((resolve, reject) => {
        db.put("block", JSON.stringify(blockHeight.data), { sync: true }, (err: Error | undefined) => {
          if (err) {
            console.error("RocksDbProvider.put.error", err);
            return reject(err);
          }
          return resolve();
        });
      });
      await putPromise;

      const getPromise = new Promise<void>((resolve, reject) => {
        db.get("block", (err: Error | undefined, val) => {
          if (err) {
            console.error("RocksDbProvider.get.error", err);
            return reject(err);
          }

          if (val) console.log("aeswd", val.toString());
          else return reject();
        });
      });
      await getPromise;

      // const getManyPromise =  new Promise<{ key: string; val:any }[]>(async (resolve, reject) => {
      //     const result: { key: string; val:any }[] = [];
    
      //     try {
      //       const it: rocksdb.Iterator = db.iterator();
    
      //       const next = () => {
      //         it.next((err: Error | undefined, key: rocksdb.Bytes, val: rocksdb.Bytes) => {
      //           if (err) {
      //             if (err.message === "NotFound: ") return resolve([]);
      //             console.error("RocksDbProvider.getMany.iterator.next.error", err);
      //             return reject();
      //           } else if (key === undefined && val === undefined) {
      //             it.end(() => {});
      //             // console.log("it.next.finished");
      //             return resolve(result);
      //           } else {
      //             // console.log("r: " + key.toString());
      //             result.push({
      //               key: key.toString("utf8"),
      //               val: val.toString("utf8"),
      //             });
      //             console.log('getMany', val)
      //             next();
      //           }
      //         });
      //       };
    
      //       next();
      //     } catch (err) {
      //       console.error("RocksDbProvider.getMany.error", err);
      //       return reject();
      //     }
      //   });
      //   await getManyPromise;

      const delPromise = new Promise<void> ((resolve, reject) =>{
        db.del('block', (err: Error | undefined) => {
          if (err) {
            console.error("RocksDbProvider.del.error", err);
            return reject(err);
          }
          return console.log('data deleted', resolve());
        });
      });
      await delPromise;

      //const blockHash = await axios.get(`https://blockstream.info/testnet/api/block/${blockHeight.data}`);
      //console.log("dataInformation", blockHash.data);
    }
  }
};

getLastBlockHash();
