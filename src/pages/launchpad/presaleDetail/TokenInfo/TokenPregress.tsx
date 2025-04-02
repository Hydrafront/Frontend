import BorderBox from "@/components/common/BorderBox";
import InfoText from "@/components/common/InfoText";
import TokenProgressbar from "@/components/common/TokenProgressbar";
import { useTokenStatus } from "@/utils/contractUtils";
import { useParams } from "react-router";

const TokenPregress: React.FC<{ value?: number }> = ({ value = 0 }) => {
  const { tokenAddress } = useParams();
  const { isNotMigrated } = useTokenStatus(tokenAddress as `0x${string}`);
  return (
    <BorderBox>
      <p>
        <InfoText>Progress: </InfoText>
        <span className="text-green-400">{ value ? value.toFixed(3) : 0}%</span>
      </p>
      <TokenProgressbar value={value} />
      {isNotMigrated === true && <p></p>}
      {isNotMigrated === false && (
        <p className="text-[13px] mt-1">
          Uniswap pool seeded! View on uniswap{" "}
          <a
            href={`https://info.uniswap.org/explore/pools/polygon/${tokenAddress}`}
            className="text-blue-400"
          >
            here
          </a>
        </p>
      )}
    </BorderBox>
  );
};

export default TokenPregress;
