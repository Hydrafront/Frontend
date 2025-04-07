import {
  amoyPolygonFactoryAbi,
  amoyPolygonTokenAbi,
  polygonFactoryAbi,
  polygonTokenAbi,
} from "../abi/index";

export const contractConfig = {
  "137": {
    factoryAddress: import.meta.env.VITE_POLYGON_CONTRACT_ADDRESS,
    factoryAbi: amoyPolygonFactoryAbi,
    tokenAbi: amoyPolygonTokenAbi,
  },
  "80002": {
    factoryAddress: import.meta.env.VITE_AMOY_CONTRACT_ADDRESS,
    factoryAbi: polygonFactoryAbi,
    tokenAbi: polygonTokenAbi,
  },
};

