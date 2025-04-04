import { createSlice } from "@reduxjs/toolkit";
import { TokenType, TransactionType } from "@/interfaces/types";

interface TokenState {
  tokens: TokenType[];
  token: TokenType | undefined;
  isTransacting: boolean;
  transactions: TransactionType[];
  filters: Record<string, string>;
  tokenCount: number;
  tab: "info" | "chart-txn" | "chart" | "txn";
  initialPrice: number;
  factoryAddress: string;
  trendingTokens: TokenType[];
  privateKey: string;
}

const initialState: TokenState = {
  tokens: [],
  token: undefined,
  isTransacting: false,
  transactions: [],
  filters: {},
  tokenCount: 0,
  tab: "info",
  initialPrice: 0,
  factoryAddress: "",
  trendingTokens: [],
  privateKey: "",
};

const TokenSlice = createSlice({
  name: "token",
  initialState: { ...initialState },
  reducers: {
    setTokens: (state, action) => {
      state.tokens = action.payload;
    },
    setToken: (state, action) => {
      state.token = { ...state.token, ...action.payload };
    },
    addToken: (state, action) => {
      if (
        !state.tokens.some(
          (token) => token.tokenAddress === action.payload.tokenAddress
        )
      ) {
        state.tokens.push(action.payload);
      }
    },
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    addTransaction: (state, action) => {
      if (
        !state.transactions.some(
          (transaction) => transaction.txHash === action.payload.txHash
        )
      ) {
        state.transactions.push(action.payload);
      }
    },
    updateTokenList: (state, action) => {
      state.tokens = state.tokens.filter((token) => {
        if (token.tokenAddress === action.payload.tokenAddress) {
          return { ...token, ...action.payload };
        }
        return token;
      });
      state.token = { ...state.token, ...action.payload };
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setTokenCount: (state, action) => {
      state.tokenCount = action.payload;
    },
    setTab: (state, action) => {
      state.tab = action.payload;
    },
    resetToken: (state) => {
      state.token = undefined;
    },
    resetTransactions: (state) => {
      state.transactions = [];
    },
    setInitialPrice: (state, action) => {
      state.initialPrice = action.payload;
    },
    setTrendingTokens: (state, action) => {
      state.trendingTokens = action.payload;
    },
    clearTokens: (state) => {
      state.tokens = [];
      state.tokenCount = 0;
    },
    setPrivateKey: (state, action) => {
      state.privateKey = action.payload;
    }
  },
});

export const {
  setToken,
  setTokens,
  addToken,
  setTransactions,
  addTransaction,
  updateTokenList,
  setFilters,
  setTokenCount,
  setTab,
  resetToken,
  resetTransactions,
  setInitialPrice,
  setTrendingTokens,
  clearTokens,
  setPrivateKey
} = TokenSlice.actions;

export default TokenSlice.reducer;
