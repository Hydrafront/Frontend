// import TradingViewWidget from "@/components/trading-view";
// import LeftDrawer from "./LeftDrawer";
// import InfoDrawer from "./InfoDrawer";
import { useParams } from "react-router";
import RegularRecharts from "./RegularRecharts";
import TokenInfo from "./TokenInfo";
import Transactions from "./Transactions";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getTokenByAddress,
  getTransactionsByTokenAddress,
} from "@/store/actions/token.action";
import TradingViewChart from "@/components/ui/TradingViewChart";
import { isEmpty } from "@/utils/validation";
import { getPriceUrl, getUnit } from "@/utils/config/chainDexConfig";
import Spin3 from "@/components/spins/Spin3";
import PriceEthProvider from "@/components/ui/PriceEthProvider";
import TabDrawer from "./TabDrawer";

const PresaleDetail: React.FC = () => {
  const dispatch = useAppDispatch();
  const { type, tokenAddress } = useParams();

  const { chainId } = useParams();
  const { tab } = useAppSelector((state) => state.token);
  const { token } = useAppSelector((state) => state.token);
  useEffect(() => {
    dispatch(getTokenByAddress(tokenAddress as `0x${string}`));
    dispatch(getTransactionsByTokenAddress(tokenAddress as `0x${string}`));
  }, [tokenAddress, dispatch]);

  if (isEmpty(token)) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spin3 />
      </div>
    );
  }
  return (
    <PriceEthProvider
      chainId={Number(chainId)}
      priceUrl={getPriceUrl(Number(chainId))}
    >
      {/* <div className="flex 2xl:h-[calc(100vh-85px)] xl:h-[calc(100vh-83px)] sm:h-[calc(100vh-80px)] h-[calc(100vh-63px)] justify-between"> */}
      <div className="flex justify-between h-full">
        <div className="w-full h-full hidden md:flex flex-col overflow-hidden border-borderColor border-r">
          <div className="flex flex-1">
            {/* <LeftSidebar type={type} /> */}
            <div className="w-full ">
              {type === "erc20" ? (
                <div className="p-2 border-2  border-borderColor">
                  <RegularRecharts />
                </div>
              ) : (
                <div className="h-full border-2 border-borderColor">
                  <TradingViewChart
                    symbol={`${token?.symbol}/${getUnit(
                      token?.chainId as number
                    )}`}
                    interval="1"
                    containerId="tv_chart_container"
                  />
                </div>
              )}
            </div>
          </div>
          <Transactions />
        </div>
        <div className="hidden md:block w-[375.25px]">
          <TokenInfo type={type} />
        </div>
        <div className="block md:hidden w-full">
          {tab === "info" && (
            <div className="w-full">
              <TokenInfo type={type} />
            </div>
          )}
          {tab === "chart-txn" && (
            <div>
              <div className="h-full border-2 border-borderColor">
                <TradingViewChart
                  symbol={`${token?.symbol}/${getUnit(
                    token?.chainId as number
                  )}`}
                  interval="1"
                  containerId="tv_chart_container"
                />
              </div>
              <Transactions />
            </div>
          )}
          {tab === "chart" && (
            <div className="h-full border-2 border-borderColor">
              <TradingViewChart
                symbol={`${token?.symbol}/${getUnit(token?.chainId as number)}`}
                interval="1"
                containerId="tv_chart_container"
              />
            </div>
          )}
          {tab === "txn" && <Transactions />}
        </div>
        <TabDrawer />
      </div>
    </PriceEthProvider>
  );
};
export default PresaleDetail;
