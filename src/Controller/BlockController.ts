import express, { Response, Request } from "express";
import { BlockBusiness } from "../Business/BlockBusiness";

const app = express();
const data = new BlockBusiness();

app.post("/block", async (req: any, res: any) => {
  const result = await data.postDocument();
  res.status(201).send(result);
});

app.delete("/block", async (req: any, res: any) => {
  const block_height = req.query.block_height;
  const result = await data.deleteDocument(block_height);
  res.send(result);
});

app.get("/block", async (req: any, res: any) => {
  const result = await data.getAllDocuments();
  res.status(200).send(result);
});

app.get("/block/txCount", async (req: any, res: any) => {
  const gte = req.query.gte;
  const lte = req.query.lte;
  const result = await data.getDocumentsByTxCount(gte, lte);
  res.send(result);
});

app.get("/block/blockHeight", async (req: any, res: any) => {
  const blockHeight = req.query.block_height;
  const result = await data.getDocumentByBlockHeight(blockHeight);
  res.send(result);
});

app.listen(3000, () => console.log(`Example app listening on port 3000!`));
