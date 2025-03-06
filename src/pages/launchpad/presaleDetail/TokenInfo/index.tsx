import BorderBox from "@/components/common/BorderBox";
import TokenHeader from "./TokenHeader";
import TokenLinkGroups from "./TokenLinkGroups";
import TokenPregress from "./TokenPregress";
import InfoText from "@/components/common/InfoText";
import TokenBuyAndSell from "./buyAndSell";
import TokenAlert from "./TokenAlert";
import TokenBuyAndSellInfo from "./TokenBuyAndSellInfo";
import TokenAddresses from "./TokenAddresses";
import TokenAudit from "./TokenAudit";
import TokenWarningText from "./TokenWarningText";
import TokenBoost from "./TokenBoost";
import TokenCommonInfo from "./TokenCommonInfo";
import TokenSwap from "./TokenSwap";
import { useAppSelector } from "@/store/hooks";
import { useCurrentTokenPrice } from "@/utils/contractUtils";
import { useParams } from "react-router";
import { useMarketCap } from "@/utils/contractUtils";
import { formatUnits } from "ethers";
import FormatPrice from "@/components/ui/FormatPrice";
import { useWatchContractEvent } from "wagmi";
import { tokenAbi } from "@/utils/abi/tokenAbi";

interface Props {
  type?: string | undefined;
}

const TokenInfo: React.FC<Props> = () => {
  const { tokenAddress, chainId } = useParams();
  const { currentPrice, refetchCurrentPrice } = useCurrentTokenPrice(
    tokenAddress as `0x${string}`
  );
  const { currentMarketCap, refetchCurrentMarketCap } = useMarketCap(
    tokenAddress as `0x${string}`
  );
  const { token } = useAppSelector((state) => state.token);
  const { ethPrice } = useAppSelector((state) => state.eth);

  useWatchContractEvent({
    address: tokenAddress as `0x${string}`,
    abi: tokenAbi,
    eventName: "Transfer",
    onLogs: (logs) => {
      console.log(logs, "-------------------------------");
      refetchCurrentPrice();
      refetchCurrentMarketCap();
    },
  });
  if (!token) return null;

  return (
    <div className="overflow-y-scroll h-[100vh] pb-5 scroll-hidden">
      <TokenHeader
        name={token.name}
        symbol={token.symbol}
        createdAt={token.createdAt}
        boost={token.boost}
        logo={token.logo}
        banner={token.banner}
        tokenAddress={token.tokenAddress}
      />

      <div className="w-full px-3 flex flex-col gap-3">
        <TokenLinkGroups
          website={token.website}
          twitter={token.twitter}
          telegram={token.telegram}
          discord={token.discord}
        />

        <TokenPregress value={token.progress} />

        <div className="flex gap-3">
          <BorderBox className="flex flex-col w-1/2">
            <InfoText className="text-center">PRICE</InfoText>
            <div className="text-center">
              <FormatPrice value={currentPrice * ethPrice[Number(chainId)]} />
            </div>
          </BorderBox>
          <BorderBox className="flex flex-col w-1/2">
            <InfoText className="text-center">MARKET CAP</InfoText>
            <div className="text-center">
              <FormatPrice
                value={parseFloat(
                  formatUnits((currentMarketCap as bigint) || 0, 18)
                )}
                doller={true}
              />
            </div>
          </BorderBox>
        </div>

        <TokenBuyAndSell />

        <TokenBuyAndSellInfo />

        <TokenAlert />

        <TokenAddresses />

        <TokenAudit />

        <TokenWarningText />

        <TokenBoost />

        <TokenCommonInfo />

        <TokenSwap />
      </div>
    </div>
  );
};
export default TokenInfo;
