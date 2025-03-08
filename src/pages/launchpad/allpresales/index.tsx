import { useEffect, useState } from "react";
import Toolbar from "./toolbar";
import NFTList from "./list";
import BitRivals from "../TrendingBar";
import NFTTable from "./table";
import { fetchTokens } from "@/store/actions/token.action";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { setFilters } from "@/store/reducers/token-slice";
import Pagination from "@/components/common/Pagination";

const AllPresales: React.FC = () => {
  const dispatch = useAppDispatch();
  const [style, setStyle] = useState<string>("apps");
  const [tab, setTab] = useState<string>("all_presales");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  const { filters, tokenCount } = useAppSelector((state) => state.token);

  const getTokens = async (parsed: Record<string, string>) => {
    setIsLoading(true);
    try {
      dispatch(fetchTokens(parsed));
    } catch (error) {
      setError("Failed to fetch tokens");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const params = Object.fromEntries(
      Object.entries(parsed).map(([key, value]) => [key, String(value || "")])
    );
    dispatch(setFilters(params));
  }, [dispatch]);

  useEffect(() => {
    getTokens(filters);
  }, [filters]);

  return (
    <div className="relative px-4 pt-3">
      <BitRivals />

      <Toolbar style={style} setStyle={setStyle} tab={tab} setTab={setTab} />
      {style === "apps" ? (
        <NFTList isLoading={isLoading} error={error} />
      ) : (
        <NFTTable />
      )}
      {tokenCount > 0 && (
        <div className="w-full flex justify-center">
          <Pagination pageCount={Math.ceil(tokenCount / 10)} />
        </div>
      )}
    </div>
  );
};
export default AllPresales;
