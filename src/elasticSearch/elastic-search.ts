import express from "express";
import bodyParser from "body-parser";
import elasticClient from "./elastic-client.js";
import "express-async-errors";

const app = express();

app.use(bodyParser.json());

app.get("/", (req: any, res: any) => {
  res.redirect("http://localhost:3000/");
});

app.get("/block/:id", async (req: any, res: any) => {
  let id = req.params.id;

  const result = await elasticClient
    .search({
      index: "posts",
      body: {
        query: {
          match: { id: id },
        },
      },
    })
    .then((response) => {
      return res.json(response);
    })
    .catch((err) => {
      return res.status(500).json({ message: "Error" });
    });
});

app.post("/create-post", async (req: any, res: any) => {
  const result = await elasticClient.index({
    index: "posts",
    document: {
      title: req.body.title,
      author: req.body.author,
      content: req.body.content,
    },
  });

  res.send(result);
});

app.delete("/remove-post", async (req: any, res: any) => {
  const result = await elasticClient.delete({
    index: "posts",
    id: req.query.id,
  });

  res.json(result);
});

app.get("/search", async (req: any, res: any) => {
  const result = await elasticClient.search({
    index: "posts",
    query: { fuzzy: { title: req.query.query } },
  });

  res.json(result);
});

app.get("/posts", async (req: any, res: any) => {
  const result = await elasticClient.search({
    index: "posts",
    query: { match_all: {} },
  });

  res.send(result);
});

app.listen(3000, () => console.log("listening on port"));
