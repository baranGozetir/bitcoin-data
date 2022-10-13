//const elasticClient = require("./elastic-client");

import elasticClient from "./elastic-client";

const createIndex = async (indexName: any) => {
  console.log("elastic index: " + indexName);
  await elasticClient.indices.get({ index: indexName });
  console.log("Index created");
};

createIndex("posts");
