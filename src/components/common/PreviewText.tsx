import React from "react";
import clsx from "clsx";

interface PreviewTextProps {
  name: string;
  value: React.ReactNode;
  border?: boolean;
}

const PreviewText = ({ name, value, border = true }: PreviewTextProps) => {
  return (
    <div className={clsx("w-full flex items-center border-borderColor py-6", border ? " border-b" : "border-none")}>
      <div className="w-1/3">{name}</div>
      <div className="w-2/3 pl-2 overflow-x-hidden text-[12px]">{value}</div>
    </div>
  )
}

export default PreviewText;