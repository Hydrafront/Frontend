import React from "react";
import { Option, Select, SelectProps } from "@material-tailwind/react";
import clsx from "clsx";

interface PropsType extends Omit<SelectProps, "ref" | "children"> {
  className?: string;
  options: {
    title: string;
    value: string;
  }[];
}

const CustomSelect = React.forwardRef<HTMLDivElement, PropsType>(
  ({ options, className, ...props }, ref) => {
    return (
      <Select
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        ref={ref}
        variant="outlined"
        className={clsx("border-none rounded-lg px-3 bg-lighterColor")}
        containerProps={{ className: className }}
        labelProps={{
          className: "px-3 content-none",
        }}
        menuProps={{
          className: "bg-lighterColor border-[#aaaaaa40]",
        }}
        {...props}
      >
        {options.map((item, index) => (
          <Option key={index} value={item.value.toString()}>
            {item.title}
          </Option>
        ))}
      </Select>
    );
  }
);

export default CustomSelect;
