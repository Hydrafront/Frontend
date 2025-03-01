import { useEffect, useState } from "react";
import Toolbar from "./toolbar";
import NFTList from "./list";
import BitRivals from "../TrendingBar";
import NFTTable from "./table";
import { fetchTokens } from "@/store/actions/create-token.action";
import { TokenType } from "@/interfaces/types";

const AllPresales: React.FC = () => {
  const [style, setStyle] = useState<string>("apps");
  const [displayTokens, setDisplayTokens] = useState<TokenType[]>([]);
  const [tab, setTab] = useState<string>("all_presales");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getTokens();
  }, []);

  const getTokens = async () => {
    setIsLoading(true);
    try {
      const data = await fetchTokens();
      setDisplayTokens(data);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch tokens");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative px-4 pt-3">
      <BitRivals />

      <Toolbar style={style} setStyle={setStyle} tab={tab} setTab={setTab} />
      {style === "apps" ? (
        <NFTList
          displayTokens={displayTokens}
          isLoading={isLoading}
          error={error}
        />
      ) : (
        <NFTTable />
      )}
    </div>
  );
};
export default AllPresales;
