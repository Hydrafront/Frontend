import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

const BtnLoadingSlice = createSlice({
  name: "btn-loading",
  initialState: { value: initialState },
  reducers: {
    openBtnLoading: (state) => {
      state.value = true;
    },
    closeBtnLoading: (state) => {
      state.value = false;
    },
  },
});

export const { openBtnLoading, closeBtnLoading } =
  BtnLoadingSlice.actions;

export default BtnLoadingSlice.reducer;
