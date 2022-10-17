import express, { Response, Request } from "express";
import { BlockBusiness } from "../Business/BlockBusiness";

const block = express.Router();
const data = new BlockBusiness();

block.put("/", async (req: any, res: any) => {
  const result = await data.put();
  res.status(201).send(result);
});

block.get("/", async (req: any, res: any) => {
  const result = await data.getMany();
  res.status(200).send(result);
});

block.get("/:id", async (req: any, res: any) => {
  let id = req.params.id;
  const result = await data.get(id);
  res.send(result);
});

block.delete("/:id", async (req: any, res: any) => {
  console.log(req);
  let id = req.params.id;
  const result = await data.delete(id);
  res.send(result);
});

block.delete("/", async (req: any, res: any) => {
  const result = await data.deleteAll();
  res.send(result);
  console.log(result);
});

module.exports = block;
