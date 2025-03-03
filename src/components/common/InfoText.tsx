import clsx from "clsx";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const InfoText: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <span className={clsx("text-sm text-textDark", className)} {...props}>
      {children}
    </span>
  );
};

export default InfoText;
