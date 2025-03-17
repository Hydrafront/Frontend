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
    logo: "/assets/images/chains/Polygon Amoy.png",
    priceUrl: "wss://stream.binance.com:9443/ws/polusdt@trade",
    rpcUrl: " https://rpc-amoy.polygon.technology/",
    dexes: [
      {
        name: "Uniswap",
        address: "0xD4d332B3f56A5686E257f08e4Be982a9c1ed5fFb",
      },
    ],
  },
  {
    name: "Unichain",
    unit: "UNI",
    id: 130,
    logo: "/assets/images/chains/Unichain.png",
    priceUrl: "wss://stream.binance.com:9443/ws/uniusdt@trade",
    rpcUrl: "https://rpc.unichain.org/",
    dexes: [
      {
        name: "Uniswap",
        address: "0xD4d332B3f56A5686E257f08e4Be982a9c1ed5fFb",
      },
    ],
  },
  {
    name: "Base",
    unit: "ETH",
    id: 8453,
    logo: "/assets/images/chains/Base.png",
    priceUrl: "wss://stream.binance.com:9443/ws/ethusdt@trade",
    rpcUrl: "https://mainnet.base.org/",
    dexes: [
      {
        name: "Uniswap",
        address: "0xD4d332B3f56A5686E257f08e4Be982a9c1ed5fFb",
      },
    ],
  },
  {
    name: "Polygon",
    unit: "MATIC",
    id: 137,
    logo: "/assets/images/chains/Polygon.png",
    priceUrl: "wss://stream.binance.com:9443/ws/maticusdt@trade",
    rpcUrl: "https://polygon-rpc.com/",
    dexes: [
      {
        name: "Uniswap",
        address: "0xD4d332B3f56A5686E257f08e4Be982a9c1ed5fFb",
      },
    ],
  },
  {
    name: "Avalanche",
    unit: "AVAX",
    id: 43114,
    logo: "/assets/images/chains/Avalanche.png",
    priceUrl: "wss://stream.binance.com:9443/ws/avaxusdt@trade",
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
    dexes: [
      {
        name: "Uniswap",
        address: "0xD4d332B3f56A5686E257f08e4Be982a9c1ed5fFb",
      },
    ],
  },
  {
    name: "BNB Smart Chain",
    unit: "BNB",
    id: 56,
    logo: "/assets/images/chains/BSC.png",
    priceUrl: "wss://stream.binance.com:9443/ws/bnbusdt@trade",
    rpcUrl: "https://bsc-dataseed.binance.org/",
    dexes: [
      {
        name: "Uniswap",
        address: "0xD4d332B3f56A5686E257f08e4Be982a9c1ed5fFb",
      },
    ],
  },
  {
    name: "OP Mainnet",
    unit: "ETH",
    id: 10,
    logo: "/assets/images/chains/OP Mainnet.png",
    priceUrl: "wss://stream.binance.com:9443/ws/ethusdt@trade",
    rpcUrl: "https://mainnet.optimism.io/",
    dexes: [
      {
        name: "Uniswap",
        address: "0xD4d332B3f56A5686E257f08e4Be982a9c1ed5fFb",
      },
    ],
  },
  {
    name: "Arbitrum One",
    unit: "ETH",
    id: 42161,
    logo: "/assets/images/chains/Arbitrum One.png",
    priceUrl: "wss://stream.binance.com:9443/ws/ethusdt@trade",
    rpcUrl: "https://arb1.arbitrum.io/rpc",
    dexes: [
      {
        name: "Uniswap",
        address: "0xD4d332B3f56A5686E257f08e4Be982a9c1ed5fFb",
      },
    ],
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

export const getChainLogo = (chainId: number) => {
  return supportedChains.find((chain) => chain.id === chainId)?.logo;
};
