import express, { Response, Request } from "express";
import { TxBusiness } from "../Business/TxBusiness";

const tx = express.Router();
const data = new TxBusiness();

tx.put("/", async (req: any, res: any) => {
  const key = req.body.key;
  const value = req.body.value;
  const result = await data.put(key, value);
  res.status(201).send(result);
});

tx.get("/", async (req: any, res: any) => {
  console.log("111", req.params);
  const result = await data.getMany();
  res.status(200).send(result);
});

tx.get("/:id", async (req: any, res: any) => {
  console.log(req);
  let id = req.params.id;
  const result = await data.get(id);
  res.send(result);
});

tx.delete("/:id", async (req: any, res: any) => {
  console.log(req);
  let id = req.params.id;
  const result = await data.delete(id);
  res.send(result);
});

tx.delete("/", async (req: any, res: any) => {
  const result = await data.deleteAll();
  res.send(result);
  console.log(result);
});

export default tx;
