import express from "express";
import BlockContorller from "./Controller/BlockController.js";
import TxController from "./Controller/TxController.js";

const app = express();

app.get("/", (req: any, res: any) => {
  res.send("hello world");
});

app.use("/block", BlockContorller);
app.use("/tx", TxController);

app.listen(3000, () => console.log("server running"));
