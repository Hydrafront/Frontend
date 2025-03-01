import { createSlice } from "@reduxjs/toolkit";

export interface DialogType {
    visible: boolean,
    options: {
        children?: React.ReactElement,
    }
}

const initialState: DialogType = {
    visible: false,
    options: {}
};

const DialogSlice = createSlice({
    name: "dialog",
    initialState: { value: initialState },
    reducers: {
        openDialog: (state, action) => {
            state.value.visible = true;
            state.value.options = { ...initialState.options, ...action.payload }
        },
        closeDialog: (state) => {
            state.value.visible = false;
            state.value.options = { ...initialState.options };
        },
    },
});

export const { openDialog, closeDialog } =
    DialogSlice.actions;

export default DialogSlice.reducer;
