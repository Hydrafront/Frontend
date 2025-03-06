import { factoryAbi } from "../abi/factoryAbi";

export const contractConfig = {
  "137": {
    factory: {
      address: import.meta.env.VITE_POLYGON_CONTRACT_ADDRESS,
    },
  },
  "80002": {
    factory: {
      address: import.meta.env.VITE_AMOY_CONTRACT_ADDRESS,
    },
  },
};

export const factoryContract = {
  address: import.meta.env.VITE_AMOY_CONTRACT_ADDRESS,
  abi: factoryAbi,
} as const;
