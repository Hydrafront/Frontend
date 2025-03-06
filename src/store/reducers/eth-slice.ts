import { createSlice } from "@reduxjs/toolkit";

export interface EthType {
  ethPrice: Record<string, number>;
}

const initialState: EthType = {
  ethPrice: {},
};

const EthSlice = createSlice({
  name: "eth",
  initialState: { ...initialState },
  reducers: {
    setEthPrice: (state, action) => {
      state.ethPrice = { ...state.ethPrice, ...action.payload };
    },
  },
});

export const { setEthPrice } = EthSlice.actions;

export default EthSlice.reducer;
