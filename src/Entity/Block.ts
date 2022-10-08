export type Block = {
  id: string;
  height: number;
  version: number;
  timestamp: number;
  tx_count: number;
  size: number;
  weight: number;
  merkle_root: string;
  previousblockhash: string | null;
  mediantime: number;
  nonce: number;
  bits: number;
  difficulty: number;
  ext: any;
};
