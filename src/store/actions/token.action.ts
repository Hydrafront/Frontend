import { PinataSDK } from "pinata-web3";
import { toast } from "react-toastify";
import axios from "axios";
import {
  setToken,
  setTokens,
  setTransactions,
  setTokenCount,
} from "../reducers/token-slice";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { AnyAction } from "redux";
import { TransactionType } from "@/interfaces/types";
import socket from "@/socket/token";
import { closeLoading } from "../reducers/loading-slice";

const pinata = new PinataSDK({
  pinataJwt: import.meta.env.VITE_PINATA_TOKEN,
  pinataGateway: "https://gateway.pinata.cloud",
});

export const BASE_URL = `${import.meta.env.VITE_SERVER_URL}/api/token`;

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
  description?: string;
  dex?: {
    name: string;
    address: `0x${string}`;
  };
  chainId?: number;
  logo?: string;
  name?: string;
  symbol?: string;
  price?: number;
  marketCap?: number;
  creator?: `0x${string}`;
  type?: string;
  banner?: string;
  progress?: number;
  website?: string;
  twitter?: string;
  telegram?: string;
  discord?: string;
  boost?: number;
}

export const createTokenInfo = async (
  tokenAddress: `0x${string}`,
  info: TokenInfo
) => {
  console.log(info, "info");
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

export const fetchTokens =
  (
    parsed: Record<string, string>
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    try {
      const res = await axios.post(`${BASE_URL}/get`, parsed);
      dispatch(setTokens(res.data.tokens));
      dispatch(setTokenCount(res.data.tokenCount));
    } catch (error) {
      throw new Error("Failed to fetch tokens");
    }
  };

export const getTokenByAddress =
  (address: `0x${string}`): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    try {
      const res = await axios.get(`${BASE_URL}/get-by-address/${address}`);
      dispatch(setToken(res.data));
      return res.data;
    } catch (error) {
      throw new Error("Failed to get token by address");
    }
  };

export const getTransactionsByTokenAddress =
  (address: `0x${string}`): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/get-transactions-by-address/${address}`
      );
      dispatch(setTransactions(res.data));
      return res.data;
    } catch (error) {
      throw new Error("Failed to get transactions by token address");
    }
  };

export const saveTransactionAction =
  (
    transaction: TransactionType
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  async () => {
    try {
      const res = await axios.post(`${BASE_URL}/save-transaction`, {
        transaction,
      });
      console.log("res.data", res.data);
      socket.emit("save-transaction", res.data);
    } catch (error) {
      throw new Error("Failed to save transaction");
    }
  };
export const updateBoost =
  (
    tokenAddress: `0x${string}`,
    boost: number
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    try {
      await axios.put(`${BASE_URL}/update-boosted`, {
        tokenAddress,
        boost,
      });
      dispatch(setToken({ boost }));
      toast.success("Boost updated successfully");
      socket.emit("update-boosted", boost);
    } catch (error) {
      throw new Error("Failed to update boost");
    } finally {
      dispatch(closeLoading());
    }
  };
