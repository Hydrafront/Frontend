export interface TokenType {
  id: number;
  name: string;
  symbol: string;
  logo: string;
  banner?: string;
  website?: string;
  twitter?: string;
  telegram?: string;
  discord?: string;
  description: string;
  decimals: number;
  factory?: `0x${string}`;
  dex?: {
    name: string;
    address: `0x${string}`;
  };
  price: number;
  marketCap: number;
  volume: number;
  transaction: number;
  transactionCount?: number;
  makerCount?: number;
  progress?: number;
  _5M?: number;
  _1H?: number;
  _6H?: number;
  _24H?: number;
  boost?: number;
  creator?: string;
  chainId: number;
  address: string;
  tokenAddress?: `0x${string}`;
  type?: "presale" | "erc20";
  createdAt: string;
  updatedAt: string;
}
export interface TransactionType {
  txHash: string;
  type: string;
  symbol: string;
  tokenAddress: `0x${string}`;
  token: number;
  eth: number;
  usd: number;
  price: number;
  maker: `0x${string}`;
  chainId: number;
  createdAt?: string;
}

export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface BoostType {
  times: number;
  hours: number;
  price: number;
  width?: string;
}

export interface EmailType {
  email: string;
  name: string;
  discord?: string;
  telegram?: string;
  twitter?: string;
  message: string;
}