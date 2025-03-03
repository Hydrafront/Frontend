import IconText from "@/components/common/IconText";
import { Collapse } from "@material-tailwind/react";
import {
  IconChevronDown,
  IconChevronUp,
  IconCircleCheckFilled,
  IconExclamationCircle,
} from "@tabler/icons-react";
import { useState } from "react";

const TokenAudit = () => {
  const [open, setOpen] = useState<boolean>(false);
  const toggleOpen = () => setOpen(!open);
  const options: { title: string; status: string }[] = [
    { title: "Ownership renounced", status: "Yes" },
    { title: "Hidden owner", status: "No" },
    { title: "Has obfuscated address", status: "No" },
    { title: "Has suspicious functions", status: "No" },
    { title: "Honeypot", status: "No" },
    { title: "Proxy contract", status: "No" },
    { title: "Mintable", status: "No" },
    { title: "Transfer pausable", status: "No" },
    { title: "Trading cooldown", status: "No" },
    { title: "Has blacklist", status: "No" },
    { title: "Has whitelist", status: "No" },
  ];
  return (
    <div className="border border-borderColor rounded-md overflow-hidden">
      <div className="flex hover:bg-lighterColor" onClick={toggleOpen}>
        <button className="flex-1 border-r py-2 px-3 border-borderColor justify-between flex">
          <span className="text-[16px]">Audit</span>
          <div className="flex gap-2 items-center">
            <span className="text-white text-sm">No issues</span>
            <IconCircleCheckFilled color="#00d26c" size={16} />
          </div>
        </button>
        <button className="p-2">
          {!open ? <IconChevronDown size={16} /> : <IconChevronUp size={16} />}
        </button>
      </div>
      <Collapse open={open} className="border-t border-borderColor">
        <div className="p-2">
          {options.map((item, index) => (
            <div
              key={index}
              className="flex pb-2 pt-1 justify-between border-b border-borderColor"
            >
              <IconText className="flex-1">
                <IconExclamationCircle size={18} />
                <span className="text-sm">{item.title}</span>
              </IconText>
              <IconText>
                <IconCircleCheckFilled color="#00d26c" size={16} />
                <span className="text-greenColor">{item.status}</span>
              </IconText>
            </div>
          ))}
        </div>
      </Collapse>
    </div>
  );
};

export default TokenAudit;
