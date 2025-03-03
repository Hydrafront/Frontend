import { Dispatch } from 'redux';
import { closeBtnLoading } from "store/reducers/btnLoading-slice";
import { closeLoading } from "store/reducers/loading-slice";
import { showMessage } from "store/reducers/snack-slice"

interface ErrorResponse {
  response: {
    data: string;
  };
}

export const handleError = (dispatch: Dispatch, error: ErrorResponse) => {
  dispatch(showMessage({ message: error.response.data, variant: "error" }));
  dispatch(closeLoading());
  dispatch(closeBtnLoading());
}