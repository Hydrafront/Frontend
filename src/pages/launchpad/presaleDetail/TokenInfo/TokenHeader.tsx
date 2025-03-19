import BoltIcon from "@/components/icons/BoltIcon";
import LeafIcon from "@/components/icons/LeafIcon";
import TimeAgo from "@/components/ui/TimeAgo";
import { useAppSelector } from "@/store/hooks";
import { getUnit } from "@/utils/config/chainDexConfig";
import { IconFlame, IconLayersSubtract } from "@tabler/icons-react";
import copy from "copy-to-clipboard";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const TokenHeader = ({
  // name,
  symbol,
  createdAt,
  boost = 0,
  logo,
  banner = "",
  tokenAddress = "",
}: {
  name: string;
  symbol: string;
  createdAt: string;
  boost?: number;
  logo: string;
  banner?: string;
  tokenAddress?: string;
}) => {
  const { ethPrice } = useAppSelector((state) => state.eth);
  const { chainId } = useParams();

  const handleCopy = () => {
    copy(tokenAddress);
    toast.success("Address copied to clipboard!");
  };
  return (
    <>
      <div className="flex justify-center gap-2 pt-2 items-center">
        <span className="text-greenColor">1 {getUnit(Number(chainId))}</span>
        <span className="text-white">=</span>
        <span className="text-white flex items-center">{ethPrice[Number(chainId)] ? "$ " + ethPrice[Number(chainId)] : <div className="dot-flashing ml-4"></div>}</span>
      </div>
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
        <span className="text-[18px] text-white">{getUnit(Number(chainId))}</span>
        <div className="flex items-center">
          <LeafIcon width={16} />
          <span className="text-[13px] text-green-600">
            <TimeAgo createdAt={new Date(createdAt || "")} />
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
