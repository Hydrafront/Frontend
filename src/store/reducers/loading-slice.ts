import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

const LoadingSlice = createSlice({
  name: "loading",
  initialState: { isLoading: initialState },
  reducers: {
    openLoading: (state) => {
      state.isLoading = true;
    },
    closeLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { openLoading, closeLoading } =
  LoadingSlice.actions;

export default LoadingSlice.reducer;
