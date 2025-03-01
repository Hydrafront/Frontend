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
import FormatNumber from "@/components/ui/FormatNumber";
interface Props {
  type?: string | undefined;
}

const TokenInfo: React.FC<Props> = () => {
  const { token } = useAppSelector((state) => state.token);

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
              <FormatNumber value={token.price} />
            </div>
          </BorderBox>
          <BorderBox className="flex flex-col w-1/2">
            <InfoText className="text-center">MARKET CAP</InfoText>
            <div className="text-center">
              <FormatNumber value={token.marketCap} doller={true} />
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
