import clsx from "clsx";
import React from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const CustomButton: React.FC<Props> = ({ className, children, ...props }) => {
  return (
    <button
      className={clsx(
        "border-borderColor border rounded-md px-3 flex gap-2 items-center whitespace-nowrap",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;
