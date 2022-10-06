import express, { Response, Request } from "express";
import { BlockBusiness } from "../Business/BlockBusiness";

const app = express();
const data = new BlockBusiness();

app.put("/put", async (req: any, res: any) => {
  const result = await data.put();
  res.status(201).send(result);
});

app.get("/getMany", async (req: any, res: any) => {
  const result = await data.getMany();
  res.status(200).send(result);
});

app.get('/get/:id', async (req:any, res:any)=>{
  let id = req.params.id
  const result = await data.get(id)
  res.send(result)
})

app.delete('/delete/:id', async (req: any, res: any)=>{
  console.log(req)
  let id = req.params.id
  const result = await data.delete(id)
  res.send(result)
})

app.delete('/delete', async (req:any, res:any)=>{
  const result = await data.deleteAll()
  res.send(result)
  console.log(result)
})



app.listen(3000, () => console.log(`Example app listening on port 3000!`));
