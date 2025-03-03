import { IconCopy, IconExternalLink } from "@tabler/icons-react";
import copy from "copy-to-clipboard";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const TokenAddresses = () => {
  const handleCopy = (value: string) => () => {
    copy(value);
    toast.success("Address copied to clipboard!");
  };
  return (
    <div className="w-full mb-2">
      <div className="flex justify-between border-b border-borderColor py-2">
        <span className="text-white text-sm">Token created</span>
        <span className="text-white text-sm">19h 23m ago</span>
      </div>
      <div className="flex justify-between border-b border-borderColor py-2">
        <span className="text-white text-sm">Creator</span>
        <div className="flex gap-2">
          <button
            className="flex items-center bg-lighterColor rounded-md py-[1px] px-2 w-32 gap-2 text-[13px] select-none"
            onClick={handleCopy("address value")}
          >
            <IconCopy size={16} />
            2134...f983
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm">EXP</span>
            <Link to="#" target="_blank">
              <IconExternalLink size={16} />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-between border-b border-borderColor py-2">
        <span className="text-white text-sm">CA</span>
        <div className="flex gap-2">
          <button
            className="flex items-center bg-lighterColor rounded-md py-[1px] px-2 w-32 gap-2 text-[13px] select-none"
            onClick={handleCopy("address value")}
          >
            <IconCopy size={16} />
            2134...f983
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm">EXP</span>
            <Link to="#" target="_blank">
              <IconExternalLink size={16} />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-between border-b border-borderColor py-2">
        <span className="text-white text-sm">Bonding Curve</span>
        <div className="flex gap-2">
          <button
            className="flex items-center bg-lighterColor rounded-md py-[1px] px-2 w-32 gap-2 text-[13px] select-none"
            onClick={handleCopy("address value")}
          >
            <IconCopy size={16} />
            2134...f983
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm">EXP</span>
            <Link to="#" target="_blank">
              <IconExternalLink size={16} />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-between py-2">
        <span className="text-white text-sm">Migration DEX</span>
        <div className="flex">
          <div className="flex items-center py-[1px] px-2 w-20 text-ellipsis overflow-hidden whitespace-nowrap">
            {/* <IconCopy size={16} /> */}
            Uniswap
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenAddresses;
