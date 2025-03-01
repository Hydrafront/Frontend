import { Textarea, TextareaProps } from "@material-tailwind/react";
import clsx from "clsx";
import React from "react";

interface PropsType extends Omit<TextareaProps, "ref"> {
  className?: string;
}

const CustomTextarea = React.forwardRef<HTMLDivElement, PropsType>(
  ({ className, ...props }, ref) => {
    return (
      <Textarea
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        ref={ref}
        labelProps={{ className: "content-none" }}
        className={clsx(
          "placeholder:opacity-50 text-gray-500 border-none",
          className
        )}
        style={{ backgroundColor: "#211E2C" }}
        {...props}
      />
    );
  }
);

export default CustomTextarea;
