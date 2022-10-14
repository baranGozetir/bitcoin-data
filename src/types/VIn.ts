import { VOut } from "./VOut";

export type VIn = {
  txid: string;
  vout: number;
  is_coinbase: boolean;
  scriptsig: string;
  scriptsig_asm: string;
  inner_redeemscript_asm?: string;
  inner_witnessscript_asm?: string;
  sequence: number;
  witness?: string[];
  prevout: VOut | null;
  is_pegin: boolean;
  issuance?: {
    asset_id: string;
    is_reissuance: boolean;
    asset_blinding_nonce?: string;
    asset_entropy: string;
    contract_hash: string;
    assetamount: number;
    tokenamount: number;
  };
};
