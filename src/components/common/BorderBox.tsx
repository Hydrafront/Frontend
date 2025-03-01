import clsx from "clsx";
import React from "react";

const BorderBox: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
  return (
    <div className={clsx("border border-borderColor rounded-md px-3 py-2", className)}>
      {children}
    </div>
  )
}
export default BorderBox;