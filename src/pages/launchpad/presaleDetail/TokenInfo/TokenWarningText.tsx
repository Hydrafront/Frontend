import { useState } from "react";

const TokenWarningText = () => {
  const [open, setOpen] = useState<boolean>(false);
  const text: string =
    "Audits may not be 100% accurate! They are not intended as advice and should be considered in conjunction with other factors. Hydrapad does not validate nor assume responsibility for the accuracy of data obtained from these external auditors. ";
  return (
    <div>
      <span className="text-[13px] text-gray-500">Warning! </span>
      <span className="text-[12px] text-textDark">
        {!open ? text.slice(0, 31) : text}
      </span>
      <span className="ml-1 text-[12px] cursor-pointer" onClick={() => setOpen(!open)}>
        {open ? "Less" : "More"}
      </span>
    </div>
  );
};

export default TokenWarningText;
