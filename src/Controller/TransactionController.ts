import express, { Response, Request } from "express";
import { TransactionBusiness } from "../Business/Transaction/TransactionBusiness";

const app = express();
const data = new TransactionBusiness();

app.post("/transaction", async (req: any, res: any) => {
  const result = await data.postDocument();
  res.status(201).send(result);
});

app.delete("/transaction", async (req: any, res: any) => {
  const transaction_id = req.query.transaction_id;
  const result = await data.deleteDocument(transaction_id);
  res.send(result);
});

app.get("/transaction", async (req: any, res: any) => {
  const result = await data.getAllDocuments();
  res.status(200).send(result);
});

app.get("/transaction/filteredTransactions", async (req: any, res: any) => {
  console.log("req query", req.query);

  const result = await data.getFilteredDocuments(req.query);
  res.send(result);
});

app.listen(3000, () => console.log(`Example app listening on port 3000!`));
