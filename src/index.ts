import express from "express";
const app = express();

app.get("/", (req: any, res: any) => {
  res.send("hello world");
});

app.use("/block", require("./Controller/BlockController"));

app.listen(3000, () => console.log("server running"));
