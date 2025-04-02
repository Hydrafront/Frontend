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
import { getPriceUrl, getUnit } from "@/utils/config/chainDexConfig";
import Spin3 from "@/components/spins/Spin3";
import PriceEthProvider from "@/components/ui/PriceEthProvider";
import TabDrawer from "./TabDrawer";
import {
  resetToken,
  resetTransactions,
  setToken,
} from "@/store/reducers/token-slice";
import socket from "@/socket/token";
import {
  useCurrentTokenPrice,
  useProgressBPS,
  useMarketCap,
  useMigrate,
  useFactoryAddress,
} from "@/utils/contractUtils";

const PresaleDetail: React.FC = () => {
  const { chainId, tokenAddress, type } = useParams();
  const { tab } = useAppSelector((state) => state.token);
  const { token } = useAppSelector((state) => state.token);
  const dispatch = useAppDispatch();
  const { refetchCurrentPrice } = useCurrentTokenPrice(
    tokenAddress as `0x${string}`
  );
  const { refetchCurrentMarketCap } = useMarketCap(
    tokenAddress as `0x${string}`
  );
  const { refetchProgressBPS } = useProgressBPS(tokenAddress as `0x${string}`);
  const { refetchCanMigrate } = useMigrate(
    token?.factory as `0x${string}`,
    tokenAddress as `0x${string}`
  );
  const { factoryAddress } = useFactoryAddress(tokenAddress as `0x${string}`);

  useEffect(() => {
    dispatch(getTokenByAddress(tokenAddress as `0x${string}`));
    dispatch(getTransactionsByTokenAddress(tokenAddress as `0x${string}`));
    return () => {
      dispatch(resetToken());
      dispatch(resetTransactions());
    };
  }, [tokenAddress, dispatch]);

  useEffect(() => {
    dispatch(setToken({ factory: factoryAddress }));
  }, [factoryAddress, dispatch]);

  useEffect(() => {
    socket.on("save-transaction", () => {
      refetchCurrentMarketCap();
      refetchCurrentPrice();
      refetchProgressBPS();
      refetchCanMigrate();
    });
  }, [refetchCurrentMarketCap, refetchCurrentPrice, refetchProgressBPS]);

  if (token && token.symbol)
    return (
      <PriceEthProvider
        chainId={Number(chainId)}
        priceUrl={getPriceUrl(Number(chainId))}
      >
        {/* <div className="flex 2xl:h-[calc(100vh-85px)] xl:h-[calc(100vh-83px)] sm:h-[calc(100vh-80px)] h-[calc(100vh-63px)] justify-between"> */}
        <div className="flex justify-between h-full">
          <div className="w-full h-full hidden md:flex flex-col overflow-hidden border-borderColor border-r">
            <div className="flex">
              {/* <LeftSidebar type={type} /> */}
              <div className="w-full ">
                {type === "erc20" ? (
                  <div className="p-2 border-2  border-borderColor">
                    <RegularRecharts />
                  </div>
                ) : (
                  <div className="h-full border-2 border-borderColor">
                    <TradingViewChart
                      symbol={`${token.symbol}/${getUnit(
                        token.chainId as number
                      )}`}
                      interval="60"
                      containerId="tv_chart_container_1"
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
                    symbol={`${token.symbol}/${getUnit(
                      token.chainId as number
                    )}`}
                    interval="60"
                    containerId="tv_chart_container_2"
                  />
                </div>
                <Transactions />
              </div>
            )}
            {tab === "chart" && (
              <div className="h-full border-2 border-borderColor">
                <TradingViewChart
                  symbol={`${token.symbol}/${getUnit(token.chainId as number)}`}
                  containerId="tv_chart_container_3"
                  interval="60"
                />
              </div>
            )}
            {tab === "txn" && <Transactions />}
          </div>
          <TabDrawer />
        </div>
      </PriceEthProvider>
    );
  else
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spin3 />
      </div>
    );
};
export default PresaleDetail;
