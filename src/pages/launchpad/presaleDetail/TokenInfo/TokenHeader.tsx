import BoltIcon from "@/components/icons/BoltIcon";
import LeafIcon from "@/components/icons/LeafIcon";
import { getCreatedBefore } from "@/utils/func";
import { IconFlame, IconLayersSubtract } from "@tabler/icons-react";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";

const TokenHeader = ({
  // name,
  symbol,
  createdAt,
  boost,
  logo,
  banner,
  tokenAddress,
}: {
  name: string;
  symbol: string;
  createdAt: string;
  boost: number;
  logo: string;
  banner: string;
  tokenAddress: string;
}) => {
  const handleCopy = () => {
    copy(tokenAddress);
    toast.success("Address copied to clipboard!");
  };
  return (
    <>
      <div className="p-2 flex justify-center gap-2 items-center">
        <div className="cursor-pointer text-white flex gap-1 items-center text-[18px]">
          {symbol}
          <IconLayersSubtract
            className="cursor-pointer"
            onClick={handleCopy}
            size={18}
            color="grey"
          />
        </div>
        <span className="text-[18px]">/</span>
        <span className="text-[18px] text-white">SOL</span>
        <div className="flex items-center">
          <LeafIcon width={16} />
          <span className="text-[13px] text-green-600">
            {getCreatedBefore(new Date(createdAt))}
          </span>
        </div>
        <div className="flex items-center">
          <IconFlame width={16} color="orange" />
          <span className="text-[13px] text-orange-400">#2</span>
        </div>
        <div className="flex items-center">
          <BoltIcon fill="yellow" width={16} />
          <span className="text-[13px] text-yellow-400">{boost}</span>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="h-28 w-full flex items-center"
      >
        <img
          src={logo}
          alt="token-avatar"
          className="w-16 h-16 rounded-md ml-4 mb-2 border-2 border-green-500"
        />
      </div>
    </>
  );
};

export default TokenHeader;
