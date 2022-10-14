export type Tx = {
  txid: string;
  version: number;
  loctime: number;
  vin: [];
  vout: [];
  size: number;
  weight: number;
  fee: number;
  status: {};
};
