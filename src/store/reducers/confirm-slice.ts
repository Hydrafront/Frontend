import { createSlice } from "@reduxjs/toolkit";

export interface ConfirmType {
  visible: boolean;
  options: {
    title: string;
    onOk: () => void
  }
}

const initialState: ConfirmType = {
  visible: false,
  options: {
    title: "",
    onOk: () => {}
  }
};

const ConfirmSlice = createSlice({
  name: "confirm",
  initialState: { value: initialState },
  reducers: {
    openConfirm: (state, action) => {
      state.value.visible = true;
      state.value.options = { ...initialState.options, ...action.payload }
    },
    closeConfirm: (state) => {
      state.value.visible = false;
      state.value.options = { ...initialState.options };
    },
  },
});

export const { openConfirm, closeConfirm } =
  ConfirmSlice.actions;

export default ConfirmSlice.reducer;
