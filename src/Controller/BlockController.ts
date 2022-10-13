import express, { Response, Request } from "express";
import { BlockBusiness } from "../Business/BlockBusiness";

const app = express();
const data = new BlockBusiness();

app.post("/block", async (req: any, res: any) => {
  const result = await data.postDocument();
  res.status(201).send(result);
});

app.delete("/block/:id", async (req: any, res: any) => {
  let id = req.params.id;
  const result = await data.deleteDocument(id);
  res.send(result);
});

app.get("/block", async (req: any, res: any) => {
  const result = await data.getAllDocuments();
  res.status(200).send(result);
});

app.get("/blocksByTxCount", async (req: any, res: any) => {
  //let id = req.params.id
  const result = await data.getDocumentsByTxCount();
  res.send(result);
});

app.get("/getDocumentByBlockHeight:/block_height", async (req: any, res: any) => {
  let blockHeight = req.params.block_height;
  const result = await data.getDocumentByBlockHeight(blockHeight);
  res.send(result);
});

app.listen(3000, () => console.log(`Example app listening on port 3000!`));
