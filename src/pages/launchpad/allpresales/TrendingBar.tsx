import { TokenType } from "@/interfaces/types";
import { useAppSelector } from "@/store/hooks";
import { IconTrendingUp } from "@tabler/icons-react";
import Marquee from "react-fast-marquee";

const TrendingBar: React.FC = () => {
  const { trendingTokens } = useAppSelector((state) => state.token);
  return (
    <div className="flex justify-between pb-3 w-full bitribals">
      <div className="flex items-center w-full">
        <div className="items-center hidden xl:flex">
          <div className="flex py-2 px-3 items-center justify-center w-[110px] bg-[#15131D] rounded-[64px]">
            {/* <img src="/assets/images/bit_rials.png" alt="bit-rials" width={28.8} height={28.8} className="rounded-md" /> */}
            <span className="font-bold text-[14px] ml-1 text-greenColor">
              Trending
            </span>
          </div>
          <IconTrendingUp className="ml-3 mr-6 w-[30px]" color="green" />
        </div>
        <div className="flex justify-between overflow-hidden w-full">
          <Marquee className="pt-3">
            {trendingTokens.map((item: TokenType, index) => (
              <div
                key={index}
                onClick={() => {
                  window.location.href = `/detail/${item.chainId}/${item.tokenAddress}/${item.type}`;
                }}
                className="flex items-center mr-3 border border-greenColor bg-black pr-2 rounded-md cursor-pointer hover:bg-[#322d45] transition relative"
              >
                <div className="absolute -top-2 -right-2 bg-black border border-greenColor text-[12px] px-2 py-[1px] rounded-full">
                  <i className="text-greenColor">#{index + 1}</i>
                </div>
                <div>
                  <div className="w-[40px] h-[40px] text-[12px] p-1 rounded-md flex justify-center items-center text-white">
                    <img
                      src={item.logo}
                      alt="bitrivals"
                      className="w-full h-full rounded-md"
                    />
                  </div>
                </div>
                <span className="text-[13px] mx-2">{item.symbol}</span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};
export default TrendingBar;
