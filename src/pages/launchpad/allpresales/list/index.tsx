import NFTCard from "./NFTCard";
import { TokenType } from "@/interfaces/types";
import { AnimationOnScroll } from "react-animation-on-scroll";
import Spin1 from "@/components/spins/Spin1";
import { IconAlertCircle, IconBrandDatabricks } from "@tabler/icons-react";
import { useAppSelector } from "@/store/hooks";
import { isEmpty } from "@/utils/validation";
interface PropsType {
  isLoading: boolean;
  error: string;
}

const NFTList: React.FC<PropsType> = ({ isLoading, error }) => {
  const { tokens } = useAppSelector((state) => state.token);

  if (isEmpty(tokens)) return (
    <div className="h-full w-full flex items-center gap-3 justify-center pt-20 md:pt-40">
      <IconBrandDatabricks size={40} color="grey" />
      <span className="text-[20px] text-textDark">No Presale</span>
    </div>
  )

  return (
    <div className="mb-10 -mx-2">
      <div className="flex flex-wrap mb-6">
        {isLoading && (
          <div className="w-full flex justify-center h-[300px] items-center">
            <Spin1 />
          </div>
        )}
        {error && (
          <div className="flex items-center gap-2 h-[300px] text-textDark text-2xl">
            <IconAlertCircle color="#797979" size={40} />
            {error}
          </div>
        )}
        {!isEmpty(tokens) &&
          tokens.map((item: TokenType, index: number) => (
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
      
    </div>
  );
};
export default NFTList;
