import Pagination from "@/components/common/Pagination";
import NFTCard from "./NFTCard";
import { TokenType } from "@/interfaces/types";
import { AnimationOnScroll } from "react-animation-on-scroll";
import Spin2 from "@/components/spins/spin2/Spin2";
import { IconAlertCircle } from "@tabler/icons-react";
interface PropsType {
  displayTokens: TokenType[];
  isLoading: boolean;
  error: string;
}

const NFTList: React.FC<PropsType> = ({ displayTokens, isLoading, error }) => {
  return (
    <div className="pb-10 -mx-2">
      <div className="flex flex-wrap mb-6">
        {isLoading && (
          <div className="w-full flex justify-center h-[300px] items-center">
            <Spin2 />
          </div>
        )}
        {error && (
          <div className="flex items-center gap-2 h-[300px] text-textDark text-2xl">
            <IconAlertCircle color="#797979" size={40} />
            {error}
          </div>
        )}
        {displayTokens &&
          displayTokens.map((item: TokenType, index: number) => (
            <div key={index} className={"px-2 w-full xl:w-1/2 2xl:w-1/3"}>
              <AnimationOnScroll
                animateIn="animate__zoomIn"
                animateOut="animate_zoomOut"
                offset={-100}
                initiallyVisible
              >
                <NFTCard {...item} />
              </AnimationOnScroll>
            </div>
          ))}
      </div>
      {displayTokens.length > 0 && (
        <div className="w-full flex justify-center">
          <Pagination pageCount={5} />
        </div>
      )}
    </div>
  );
};
export default NFTList;
