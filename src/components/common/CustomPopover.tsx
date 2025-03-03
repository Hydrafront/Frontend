import {
  Popover,
  PopoverContent,
  PopoverHandler,
  PopoverProps,
} from "@material-tailwind/react";
import React from "react";

interface Props extends PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

const CustomPopover: React.FC<Props> = ({ trigger, children, ...props }) => {
  return (
    <Popover
      placement="bottom-start"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: "-50%" },
      }}
      {...props}
    >
      <PopoverHandler>{trigger}</PopoverHandler>
      <PopoverContent 
        className="p-1 bg-lightColor rounded-md border-borderColor min-w-[150px] flex z-[9999] max-h-[300px] overflow-y-scroll"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
};

export default CustomPopover;
