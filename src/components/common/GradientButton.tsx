import React from "react"
import clsx from 'clsx';
import { ButtonProps } from "@material-tailwind/react";

interface PropsType extends ButtonProps {
  children: React.ReactNode;
  className?: string;
}

const GradientButton: React.FC<PropsType> = ({ className, children, ...props }) => {
  return (
    <button className={clsx("orange-gradient rounded-full font-primary px-5 py-2", className)} {...props}>{children}</button>
  )
}
export default GradientButton;