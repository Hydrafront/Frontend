export interface TokenType {
  type: "presale" | "erc20";
  tokenAddress: `0x${string}`;
  name: string;
  symbol: string;
  chainId: number;
  description: string;
  logo: string;
  banner: string;
  website: string;
  twitter: string;
  telegram: string;
  discord: string;
  transactionCount: number;
  marketCap: number;
  volume: number;
  makerCount: number;
  price: number;
  progress: number;
  _5M: number;
  _1H: number;
  _6H: number;
  _24H: number;
  boost: number;
  creator: string;
  createdAt: string;
  decimals: number;
}
export interface TransactionType {
  txHash: string;
  type: string;
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

