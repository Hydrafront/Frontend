import { createSlice } from "@reduxjs/toolkit";

const initialState: { isLoading: boolean; text: string } = {
  isLoading: false,
  text: "", 
};

const LoadingSlice = createSlice({
  name: "loading",
  initialState: initialState,
  reducers: {
    openLoading: (state, action) => {
      state.isLoading = true;
      state.text = action.payload;
    },
    closeLoading: (state) => {
      state.isLoading = false;
      state.text = "";
    },
  },
});

export const { openLoading, closeLoading } =
  LoadingSlice.actions;

export default LoadingSlice.reducer;
