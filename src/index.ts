import express from "express";
import BlockController from "./Controller/BlockController.js";
import TxController from "./Controller/TxController.js";
import { BlockAndTransaction } from "./Jobs/BlockAndTransaction";

const app = express();

app.get("/", (req: any, res: any) => {
  const newBlock = new BlockAndTransaction();
  res.send("hello world");
});

app.use("/block", BlockController);
app.use("/tx", TxController);

app.listen(3000, () => console.log("server running"));
