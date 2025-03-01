import { configureStore } from "@reduxjs/toolkit";
import DialogReducer from "./reducers/dialog-slice";
import SnackReducer from "./reducers/snack-slice";
import LoadingReducer from "./reducers/loading-slice";
import BtnLoadingReducer from "./reducers/btnLoading-slice";
import ConfirmReducer from "./reducers/confirm-slice";
import TokenReducer from "./reducers/token-slice";

export const store = configureStore({
  reducer: {
    dialog: DialogReducer,
    confirm: ConfirmReducer,
    snack: SnackReducer,
    loading: LoadingReducer,
    btnLoading: BtnLoadingReducer,
    token: TokenReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["confirm/openConfirm", "confirm/closeConfirm"],
        ignoredPaths: ["confirm.value.options.onOk"],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
