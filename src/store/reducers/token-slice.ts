import { createSlice } from "@reduxjs/toolkit";
import { TokenType } from "@/interfaces/types";

interface TokenState {
  token: TokenType;
  isTransacting: boolean;
}

const initialState: TokenState = {
  token: {
    name: "",
    symbol: "",
    createdAt: "",
    boost: 0,
    logo: "",
    banner: "",
    tokenAddress: "0x0000000000000000000000000000000000000000" as `0x${string}`,
    type: "presale",
    chainId: 0,
    marketCap: 0,
    description: "",
    website: "",
    twitter: "",
    telegram: "",
    discord: "",
    transaction: 0,
    volume: 0,
    price: 0,
    progress: 0,
    decimals: 18,
  },
  isTransacting: false,
};

const TokenSlice = createSlice({
  name: "token",
  initialState: { ...initialState },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = TokenSlice.actions;

export default TokenSlice.reducer;
