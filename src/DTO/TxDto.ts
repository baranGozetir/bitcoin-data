export type TxDto = {
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
