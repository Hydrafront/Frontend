import TimeAgo from "@/components/ui/TimeAgo";
import { useAppSelector } from "@/store/hooks";
import { getContractAddress } from "@/utils/func";
import { IconCopy, IconExternalLink } from "@tabler/icons-react";
import copy from "copy-to-clipboard";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const TokenAddresses = () => {
  const { token } = useAppSelector((state) => state.token);

  const handleCopy = (value: `0x${string}`) => () => {
    copy(value);
    toast.success("Address copied to clipboard!");
  };

  return (
    <div className="w-full mb-2">
      <div className="flex justify-between border-b border-borderColor py-2">
        <span className="text-white text-sm">Token created</span>
        <span className="text-sm">
          <TimeAgo createdAt={new Date(token?.createdAt || "")} /> ago
        </span>
      </div>
      <div className="flex justify-between border-b border-borderColor py-2">
        <span className="text-white text-sm">Creator</span>
        <div className="flex gap-2">
          <button
            className="flex items-center bg-lighterColor rounded-md py-[1px] px-1 w-auto gap-1 text-[13px] select-none"
            onClick={handleCopy(token?.creator as `0x${string}`)}
          >
            <div>
              <IconCopy size={14} />
            </div>
            {token?.creator?.slice(0, 6)}...{token?.creator?.slice(-4)}
          </button>
          <div className="flex items-center gap-2">
            {/* <span className="text-sm">EXP</span> */}
            <Link to={`https://amoy.polygonscan.com/address/${token?.creator}`} target="_blank">
              <IconExternalLink size={16} />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-between border-b border-borderColor py-2">
        <span className="text-white text-sm">{token?.symbol}</span>
        <div className="flex gap-2">
          <button
            className="flex items-center bg-lighterColor rounded-md py-[1px] px-1 w-auto gap-1 text-[13px] select-none"
            onClick={handleCopy(token?.tokenAddress as `0x${string}`)}
          >
            <div>
              <IconCopy size={14} />
            </div>
            {token?.tokenAddress?.slice(0, 6)}...{token?.tokenAddress?.slice(-4)}
          </button>
          <div className="flex items-center gap-2">
            {/* <span className="text-sm">EXP</span> */}
            <Link to={`https://amoy.polygonscan.com/address/${token?.tokenAddress}`} target="_blank">
              <IconExternalLink size={16} />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-between border-b border-borderColor py-2">
        <span className="text-white text-sm">Bonding Curve</span>
        <div className="flex gap-2">
          <button
            className="flex items-center bg-lighterColor rounded-md py-[1px] px-1 w-auto gap-1 text-[13px] select-none"
            onClick={handleCopy(getContractAddress(token?.chainId as number))}
          >
            <div>
              <IconCopy size={14} />
            </div>
            {getContractAddress(token?.chainId as number).slice(0, 6)}...
            {getContractAddress(token?.chainId as number).slice(-4)}
          </button>
          <div className="flex items-center gap-2">
            {/* <span className="text-sm">EXP</span> */}
            <Link to={`https://amoy.polygonscan.com/address/${getContractAddress(token?.chainId as number)}`} target="_blank">
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
            {token?.dex?.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenAddresses;
