import { ButtonProps } from "@material-tailwind/react";
import React from "react";

interface PropsType extends ButtonProps {
  children: React.ReactNode;
}

const MoveButton: React.FC<PropsType> = ({ children, ...props }) => {
  return (
    <button className="py-2 px-10 bg-[#ffffff] text-black disabled:bg-[#303030] rounded-lg" {...props}>{children}</button>
  )
}
export default MoveButton;