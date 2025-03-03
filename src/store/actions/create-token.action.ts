import { PinataSDK } from "pinata-web3";
import { toast } from "react-toastify";
import axios from "axios";

const pinata = new PinataSDK({
  pinataJwt: import.meta.env.VITE_PINATA_TOKEN,
  pinataGateway: "https://gateway.pinata.cloud",
});

const BASE_URL = `${import.meta.env.VITE_SERVER_URL}/api/token`;

export const uploadImageToPinata = async (file: File) => {
  try {
    const upload = await pinata.upload.file(file);
    return "https://gateway.pinata.cloud/ipfs/" + upload.IpfsHash;
  } catch (error) {
    console.error(error);
    toast.error("Failed to upload image");
    return undefined;
  }
};

interface TokenInfo {
  description: string;
  dex: string;
  chainId: number;
  logo: string;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  creator: `0x${string}`;
  type: string;
  banner: string;
  website: string;
  twitter: string;
  telegram: string;
  discord: string;
}

export const createTokenInfo = async (
  tokenAddress: `0x${string}`,
  info: TokenInfo
) => {
  try {
    const res = await axios.post(`${BASE_URL}/create`, {
      tokenAddress,
      info,
    });
    return res.data;
  } catch (error) {
    throw new Error("Failed to create token info");
  }
};

export const fetchTokens = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/get-all`);
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch tokens");
  }
};

export const getTokenByAddress = async (address: `0x${string}`) => {
  try {
    const res = await axios.get(`${BASE_URL}/get-by-address/${address}`);
    return res.data;
  } catch (error) {
    throw new Error("Failed to get token by address");
  }
};

