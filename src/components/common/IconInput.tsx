import clsx from "clsx";
import React from "react";

interface Props {
  icon?: React.ReactNode;
  side?: string;
  placeholder?: string;
  type?: string;
}

const IconInput: React.FC<Props> = (props) => {
  return (
    <div className="flex rounded-md">
      {props.side === "left" && (
        <button className="text-center rounded-l-lg px-4 bg-lightestColor">
          {props.icon}
        </button>
      )}
      <input
        min={props.type === "number" ? 0 : undefined}
        placeholder={props.placeholder}
        type={props.type ? props.type : "text"}
        className={clsx(
          "bg-transparent w-full p-2 px-3 border border-borderColor rounded-lg appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          props.side === "left"
            ? " rounded-l-none"
            : props.side === "right"
            ? " rounded-r-none"
            : ""
        )}
      />
      {props.side === "right" && (
        <button className="text-center rounded-r-lg px-4 bg-lightestColor">
          {props.icon}
        </button>
      )}
    </div>
  );
};

export default IconInput;
