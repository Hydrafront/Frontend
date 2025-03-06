// import TradingViewWidget from "@/components/trading-view";
// import LeftDrawer from "./LeftDrawer";
import InfoDrawer from "./InfoDrawer";
import { useParams } from "react-router";
import RegularRecharts from "./RegularRecharts";
import TokenInfo from "./TokenInfo";
import Transactions from "./Transactions";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getTokenByAddress, getTransactionsByTokenAddress } from "@/store/actions/token.action";
import TradingWedget from "@/components/ui/TradingWedget";
import Spin2 from "@/components/spins/spin2/Spin2";
import { isEmpty } from "@/utils/validation";
import EthPriceProvider from "@/components/ui/ethPriceProvider";

const PresaleDetail: React.FC = () => {
  const dispatch = useAppDispatch();
  const { type, tokenAddress, chainId } = useParams();

  
  
  const { token } = useAppSelector((state) => state.token);
  useEffect(() => {
    dispatch(getTokenByAddress(tokenAddress as `0x${string}`));
    dispatch(getTransactionsByTokenAddress(tokenAddress as `0x${string}`));
  }, [tokenAddress, dispatch]);

  if (isEmpty(token)) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spin2 />
      </div>
    );
  }
  return (
    <EthPriceProvider chainId={Number(chainId)}>
      {/* <div className="flex 2xl:h-[calc(100vh-85px)] xl:h-[calc(100vh-83px)] sm:h-[calc(100vh-80px)] h-[calc(100vh-63px)] justify-between"> */}
      <div className="flex justify-between h-full">
        <div className="w-full h-full flex flex-col overflow-hidden border-borderColor border-r">
          <div className="flex flex-1">
            {/* <LeftSidebar type={type} /> */}
            <div className="w-full ">
              {type === "erc20" ? (
                <div className="p-2 border-2  border-borderColor">
                  <RegularRecharts />
                </div>
              ) : (
                <div className="h-full border-2 border-borderColor">
                  <TradingWedget />
                </div>
              )}
            </div>
          </div>
          <Transactions />
        </div>
        <div className="hidden lg:block">
          <TokenInfo type={type} />
        </div>
        <InfoDrawer />
      </div>
    </EthPriceProvider>
  );
};
export default PresaleDetail;
