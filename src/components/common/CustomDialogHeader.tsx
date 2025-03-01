import { useAppDispatch } from "@/store/hooks";
import { closeDialog } from "@/store/reducers/dialog-slice";
import { DialogHeader, DialogHeaderProps } from "@material-tailwind/react";
import { IconX } from "@tabler/icons-react";
import clsx from "clsx";
import React from "react";

interface Props extends DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const CustomDialogHeader: React.FC<Props> = ({ children, className }) => {
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(closeDialog());
  };
  return (
    <DialogHeader 
      className={clsx("bg-lighterColor flex justify-between items-center", className)}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      {children}
      <button onClick={handleClose}>
        <IconX />
      </button>
    </DialogHeader>
  );
};

export default CustomDialogHeader;
