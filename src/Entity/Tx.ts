export type Tx = {
  txid: string;
  version: number;
  loctime: number;
  vin: [
    {
      txid: string;
      vout: number;
      prevout: null;
      scriptsig: string;
      scriptsig_asm: string;
      witness: [];
      is_coinbase: boolean;
      sequence: number;
    }
  ];
  vout: [
    {
      scriptpubkey: string;
      scriptpubkey_asm: string;
      scriptpubkey_type: string;
      scriptpubkey_address: string;
      value: number;
    },
    {
      scriptpubkey: string;
      scriptpubkey_asm: string;
      scriptpubkey_type: string;
      value: number;
    }
  ];
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
