export type TxDto = {
  txid: string;
  version: number;
  loctime: number;
  vin: [];
  vout: [];
  size: number;
  weight: number;
  fee: number;
  status: {
    confirmed: boolean;
    block_height: number;
    block_hash: string;
    block_time: number;
  };
};
