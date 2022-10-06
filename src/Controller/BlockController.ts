import express, { Response, Request } from "express";
import { BlockBusiness } from "../Business/BlockBusiness";

const app = express();
const data = new BlockBusiness();

app.get("/getMany", async (req: any, res: any) => {
  const result = await data.getMany();
  res.status(200).send(result);
});

app.get("/put", async (req: any, res: any) => {
  const result = await data.put();
  res.status(201).send(result);
});

app.listen(3000, () => console.log(`Example app listening on port 3000!`));
