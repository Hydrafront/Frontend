import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeConfirm } from "@/store/reducers/confirm-slice";
import { closeDialog, openDialog } from "@/store/reducers/dialog-slice";
import { DialogHeader, DialogFooter, Button } from "@material-tailwind/react";
import React, { useEffect } from "react";

interface ConfirmOptions {
  title: string;
  onOk: () => void;
}

const ConfirmDialog: React.FC = () => {
  const dispatch = useAppDispatch();
  const { visible, options } = useAppSelector(
    (state) => state.confirm.value
  ) as {
    visible: boolean;
    options: ConfirmOptions;
  };

  const handleOk = () => {
    options.onOk();
    handleClose();
  };

  const handleClose = () => {
    dispatch(closeConfirm());
    dispatch(closeDialog());
  };

  useEffect(() => {
    if (visible) {
      dispatch(
        openDialog({
          children: (
            <>
              <DialogHeader
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {options.title}
              </DialogHeader>
              <DialogFooter
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <Button
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  onClick={handleOk}
                >
                  Ok
                </Button>
                <Button
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </DialogFooter>
            </>
          ),
        })
      );
    }
  }, [visible, dispatch, options.title]);

  return <></>;
};
export default ConfirmDialog;
