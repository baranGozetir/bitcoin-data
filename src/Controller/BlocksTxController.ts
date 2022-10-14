import express, { Response, Request } from "express";
import { BlocksTxBusiness } from "../Business/BlocksTxBusiness";

const app = express();
const data = new BlocksTxBusiness();

app.put("/blockss", async (req: any, res: any) => {
  const result = await data.put();
  res.status(201).send(result);
});

app.get("/blockss", async (req: any, res: any) => {
  const result = await data.getMany();
  res.status(200).send(result);
});

app.get("/block/:id", async (req: any, res: any) => {
  let id = req.params.id;
  const result = await data.get(id);
  res.send(result);
});

app.delete("/block/:id", async (req: any, res: any) => {
  console.log(req);
  let id = req.params.id;
  const result = await data.delete(id);
  res.send(result);
});

app.delete("/block", async (req: any, res: any) => {
  const result = await data.deleteAll();
  res.send(result);
  console.log(result);
});

app.listen(3000, () => console.log(`Example app listening on port 3000!`));
