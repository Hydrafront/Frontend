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
import TokenCommonInfo from "./TokenCommonInfo";
import TokenSwap from "./TokenSwap";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCurrentTokenPrice, useProgressBPS } from "@/utils/contractUtils";
import { useParams } from "react-router";
import { useMarketCap } from "@/utils/contractUtils";
import FormatPrice from "@/components/ui/FormatPrice";
import { useWatchContractEvent } from "wagmi";
import { tokenAbi } from "@/utils/abi/tokenAbi";
import socket from "@/socket/token";
import { setToken } from "@/store/reducers/token-slice";
import TokenBoost from "./TokenBoost";

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
  const { progressBPS, refetchProgressBPS } = useProgressBPS(
    tokenAddress as `0x${string}`
  );
  const dispatch = useAppDispatch();

  useWatchContractEvent({
    address: tokenAddress as `0x${string}`,
    abi: tokenAbi,
    eventName: "Transfer",
    onLogs: (logs) => {
      console.log(logs, "-------------------------------");
      refetchCurrentPrice();
      refetchCurrentMarketCap();
      refetchProgressBPS();
      dispatch(
        setToken({
          progress: progressBPS,
          price: (currentPrice as number) * ethPrice[Number(chainId)],
          marketCap: (currentMarketCap as number) * ethPrice[Number(chainId)],
        })
      );
      socket.emit("update-token-info", {
        tokenAddress: tokenAddress as `0x${string}`,
        progress: progressBPS,
        price: (currentPrice as number) * ethPrice[Number(chainId)],
        marketCap: (currentMarketCap as number) * ethPrice[Number(chainId)],
      });
    },
  });
  if (!token) return null;

  return (
    <div className="overflow-y-scroll h-full md:h-[calc(100vh-82.5px)] lg:h-[calc(100vh-86.5px)] xl:h-[calc(100vh-90.5px)] pb-5 scroll-hidden">
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
              {ethPrice[Number(chainId)] ? (
                <FormatPrice
                  value={currentPrice * ethPrice[Number(chainId)]}
                />
              ) : (
                <div className="dot-flashing m-auto my-1"></div>
              )}
            </div>
          </BorderBox>
          <BorderBox className="flex flex-col w-1/2">
            <InfoText className="text-center">MARKET CAP</InfoText>
            <div className="text-center">
              {ethPrice[Number(chainId)] ? (
                <FormatPrice
                  value={currentMarketCap * ethPrice[Number(chainId)]}
                  doller={true}
                />
              ) : (
                <div className="dot-flashing m-auto my-1"></div>
              )}
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
