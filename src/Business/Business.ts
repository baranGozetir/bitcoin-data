import axios from "axios";
import { Repository } from "../Repository/Repository";
import { IBusiness } from "./IBusiness";

export class Business<T> implements IBusiness<T> {
  private instance: Repository<T>;

  constructor(tableName: string) {
    this.instance = new Repository<T>(tableName);
  }

  createIndice = async (): Promise<any> => await this.instance.createIndice();

  postDocument = async (data?: T): Promise<any> => this.instance.postDocument(data);

  deleteDocument = async (param: string): Promise<any> => await this.instance.deleteDocument(param);

  getAllDocuments = async (): Promise<any> => await this.instance.getAllDocuments();
}
