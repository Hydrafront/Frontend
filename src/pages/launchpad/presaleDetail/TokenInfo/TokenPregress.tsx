import BorderBox from "@/components/common/BorderBox";
import InfoText from "@/components/common/InfoText";
import TokenProgressbar from "@/components/common/TokenProgressbar";

const TokenPregress: React.FC<{ value: number }> = ({ value }) => {
  return (
    <BorderBox>
      <p>
        <InfoText>Progress: </InfoText>
        <span className="text-green-400">{value}%</span>
      </p>
      <TokenProgressbar value={value} />
    </BorderBox>
  );
};

export default TokenPregress;
