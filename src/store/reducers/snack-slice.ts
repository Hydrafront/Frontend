import { createSlice } from "@reduxjs/toolkit";

export interface SnackType {
  visible: boolean,
  options: {
    variant: "success" | "error",
    message: string
  }
}

const initialState: SnackType = {
  visible: false,
  options: {
    variant: "success",
    message: ""
  }
};

const SnackSlice = createSlice({
  name: "snack",
  initialState: { value: initialState },
  reducers: {
    showMessage: (state, action) => {
      state.value.visible = true;
      state.value.options = { ...initialState.options, ...action.payload }
    },
    closeMessage: (state) => {
      state.value.visible = false;
      state.value.options = { ...initialState.options };
    },
  },
});

export const { showMessage, closeMessage } =
  SnackSlice.actions;

export default SnackSlice.reducer;
