import { useAppDispatch } from "@/store/hooks";
import { closeDialog, DialogType } from "@/store/reducers/dialog-slice";
import { RootState } from "@/store/store";
import { Dialog } from "@material-tailwind/react";
import React from "react";
import { useSelector } from "react-redux";

const CustomDialog: React.FC = () => {
  const { visible, options } = useSelector<RootState, DialogType>(
    (state) => state.dialog.value
  );
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    dispatch(closeDialog());
  };

  return (
    <Dialog
      animate={{
        mount: { scale: 1 },
        unmount: { scale: 0 },
      }}
      className="bg-lightColor"
      handler={handleOpen}
      open={visible}
      children={options?.children || <></>}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      {...options}
    />
  );
};
export default CustomDialog;
