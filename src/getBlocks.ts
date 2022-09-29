import axios from "axios";

export const getLastBlockHash = async () => {
  return await axios.get("https://blockstream.info/testnet/api/blocks/tip/hash").then((response) => response.data);
};
