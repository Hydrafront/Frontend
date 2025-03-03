import { IconFilter } from "@tabler/icons-react";
import clsx from "clsx";
import React from "react";

interface PropsType {
  title: string;
  className?: string;
  onClick?: () => void;
}

const FilterHeader: React.FC<PropsType> = ({ title, className, ...props }) => {
  return (
    <div
      className={clsx("flex gap-2 items-center px-4", className)}
      {...props}
    >
      <span className="text-white text-[12px]">{title}</span>
      <IconFilter size={16} />
    </div>
  );
};
export default FilterHeader;
