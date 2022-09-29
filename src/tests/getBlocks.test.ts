import { getLastBlockHash } from "../getBlocks";

test("get last block hash", async () => {
  console.log("last block hash is " + (await getLastBlockHash()));
});
