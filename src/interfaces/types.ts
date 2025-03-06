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
  transaction: number;
  marketCap: number;
  volume: number;
  price: number;
  progress: number;
  boost: number;
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
