import express, { Response, Request } from "express";
import { TxBusiness } from "../Business/TxBusiness";

const app = express();
const data = new TxBusiness();

app.put("/tx", async (req: any, res: any) => {
  const result = await data.put();
  res.status(201).send(result);
});

app.get("/tx", async (req: any, res: any) => {
  console.log("111", req.params);
  const result = await data.getMany();
  res.status(200).send(result);
});

app.get("/tx/:id", async (req: any, res: any) => {
  console.log(req);
  let id = req.params.id;
  const result = await data.get(id);
  res.send(result);
});

app.delete("/tx/:id", async (req: any, res: any) => {
  console.log(req);
  let id = req.params.id;
  const result = await data.delete(id);
  res.send(result);
});

app.delete("/tx", async (req: any, res: any) => {
  const result = await data.deleteAll();
  res.send(result);
  console.log(result);
});

app.listen(3000, () => console.log(`Example app listening on port 3000!`));
