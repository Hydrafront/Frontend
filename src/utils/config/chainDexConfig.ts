// chainDexConfig.js
export const supportedChains = [
//   {
//     name: "Polygon POS",
//     chainId: 137,
//     rpcUrl: "https://polygon-rpc.com",
//     dexes: ["Uniswap"],
//   },
  {
    name: "Polygon Amoy",
    unit: "POL",
    id: 80002,
    priceUrl: "wss://stream.binance.com:9443/ws/polusdt@trade",
    rpcUrl: " https://rpc-amoy.polygon.technology/",
    dexes: ["Uniswap"],
  },
];

export const getChainName = (chainId: number) => {
  return supportedChains.find((chain) => chain.id === chainId)?.name;
};
export const getUnit = (chainId: number) => {
  return supportedChains.find((chain) => chain.id === chainId)?.unit;
};
export const getDex = (chainId: number) => {
  return supportedChains.find((chain) => chain.id === chainId)?.dexes;
};
export const getPriceUrl = (chainId: number) => {
  return supportedChains.find((chain) => chain.id === chainId)?.priceUrl;
};

