import { useEffect, useState } from "react";
import Toolbar from "./toolbar";
import NFTList from "./list";
import TrendingBar from "./TrendingBar";
import NFTTable from "./table";
import { fetchTokens, fetchTrendingTokens } from "@/store/actions/token.action";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { setFilters } from "@/store/reducers/token-slice";
import Pagination from "@/components/common/Pagination";

const AllPresales: React.FC = () => {
  const dispatch = useAppDispatch();
  const [style, setStyle] = useState<string>("apps");
  const [tab, setTab] = useState<string>("all_presales");
  const [error, setError] = useState<string>("");
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  const { filters, tokenCount } = useAppSelector((state) => state.token);

  const getTokens = async (parsed: Record<string, string>) => {
    try {
      dispatch(fetchTokens(parsed));
    } catch (error) {
      setError("Failed to fetch tokens");
    }
  };

  useEffect(() => {
    const params = Object.fromEntries(
      Object.entries(parsed).map(([key, value]) => [key, String(value || "")])
    );
    dispatch(setFilters(params));
    dispatch(fetchTrendingTokens());
  }, [dispatch]);

  useEffect(() => {
    getTokens(filters);
  }, [filters]);

  const handlePageChange = (selectedItem: { selected: number }) => {
    dispatch(setFilters({ ...filters, page: selectedItem.selected + 1 }));
  };

  return (
    <div className="relative px-4 pt-3">
      <TrendingBar />

      <Toolbar style={style} setStyle={setStyle} tab={tab} setTab={setTab} />
      {style === "apps" ? (
        <NFTList error={error} />
      ) : (
        <NFTTable />
      )}
      {tokenCount > 0 && (
        <div className="w-full flex justify-center mb-4">
          <Pagination
            onPageChange={handlePageChange}
            pageCount={Math.ceil(tokenCount / 5)}
          />
        </div>
      )}
    </div>
  );
};
export default AllPresales;
