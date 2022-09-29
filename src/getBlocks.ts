import axios from "axios";

export const getLastBlockHash = async () => {
  const initialBlockHeight: number = 0;
  const lastBlockHeight = await axios.get("https://blockstream.info/testnet/api/blocks/tip/height")
  console.log(lastBlockHeight)
  

  if(lastBlockHeight.data > initialBlockHeight){
    for(let i = initialBlockHeight; i<=lastBlockHeight.data; i++ ){
      const blockHeight = await axios.get(`https://blockstream.info/testnet/api/block-height/${i}`)
      console.log(blockHeight.data)
    }
  }
  
};