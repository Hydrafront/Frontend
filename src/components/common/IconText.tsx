import clsx from "clsx";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const IconText: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={clsx("flex gap-1 items-center", className)}>{children}</div>
  );
};

export default IconText;
