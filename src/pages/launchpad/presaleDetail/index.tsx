// import TradingViewWidget from "@/components/trading-view";
// import LeftDrawer from "./LeftDrawer";
import InfoDrawer from "./InfoDrawer";
import { useParams } from "react-router";
import RegularRecharts from "./RegularRecharts";
import TokenInfo from "./TokenInfo";
import Transactions from "./Transactions";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setToken } from "@/store/reducers/token-slice";
import { getTokenByAddress } from "@/store/actions/create-token.action";
import TradingWedget from "@/components/ui/TradingWedget";
import Spin1 from "@/components/spins/spin1/Spin1";

const PresaleDetail: React.FC = () => {
  const dispatch = useAppDispatch();

  const { type, tokenAddress } = useParams();
  const { token } = useAppSelector((state) => state.token);
  useEffect(() => {
    const fetchToken = async () => {
      const token = await getTokenByAddress(tokenAddress as `0x${string}`);
      dispatch(setToken(token));
    };
    fetchToken();
  }, [tokenAddress, dispatch]);

  if (token.tokenAddress !== tokenAddress) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spin1 />
      </div>
    );
  }
  return (
    <>
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
    </>
  );
};
export default PresaleDetail;
