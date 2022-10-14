type PegOut = {
  genesis_hash: string;
  scriptpubkey: string;
  scriptpubkey_asm: string;
  scriptpubkey_address: string;
};

export type VOut = {
  scriptpubkey: string;
  scriptpubkey_asm: string;
  scriptpubkey_type: string;
  scriptpubkey_address?: string;
  value?: number;
  valuecommitment?: string;
  asset?: string;
  assetcommitment?: string;
  pegout: PegOut | null;
};
