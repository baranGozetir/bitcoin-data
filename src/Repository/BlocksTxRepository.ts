import rocksdb from "rocksdb";
import { BlocksTx } from "../Entity/BlocksTx";
import { Repository } from "./Repository";

export class BlocksTxRepository extends Repository<BlocksTx> {
  constructor() {
    super(rocksdb("src/data/BlockTx"));
  }
}
