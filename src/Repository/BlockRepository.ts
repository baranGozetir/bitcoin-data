import rocksdb from "rocksdb";
import { Block } from "../Entity/Block";
import { Repository } from "./Repository";

export class BlockRepository extends Repository<Block> {
  constructor() {
    super(rocksdb("src/data/block"));
  }
}
