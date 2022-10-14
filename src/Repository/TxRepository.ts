import rocksdb from "rocksdb";
import { Tx } from "../Entity/Tx";
import { Repository } from "./Repository";

export class TxRepository extends Repository<Tx> {
  constructor() {
    super(rocksdb("src/tx"));
  }
}
