import { useAppSelector } from "@/store/hooks";
import { getUnit } from "@/utils/config/chainDexConfig";
import clsx from "clsx";
import { IconClockFilled } from "@tabler/icons-react";
import IconText from "@/components/common/IconText";
import BoltIcon from "@/components/icons/BoltIcon";
import { boostOptions } from "@/utils/config/common";
import { BoostType } from "@/interfaces/types";

interface BoostListProps {
  setSelectedBoost: (boost: BoostType) => void;
}

const BoostList = ({ setSelectedBoost }: BoostListProps) => {
  const { token } = useAppSelector((state) => state.token);

  return (
    <>
      <div className="flex items-center gap-2">
        <hr className="w-full border-borderColor" />
        <span className="text-whit whitespace-nowrap text-white">
          Choose a boost pack
        </span>
        <hr className="w-full border-borderColor" />
      </div>
      <div className="flex flex-wrap -mx-2">
        {boostOptions.map((item, index) => (
          <div key={index} className={clsx("p-2", item.width)}>
            <div
              onClick={() => setSelectedBoost(item)}
              className="border border-borderColor p-2 flex flex-col items-center rounded-md transition cursor-pointer hover:bg-[#18151e] bg-[#5e57771c]"
            >
              <div className="hidden lg:block">
                <BoltIcon width={50} />
              </div>
              <div className="block lg:hidden">
                <BoltIcon width={30} />
              </div>
              <span className="text-[25px] lg:text-[30px] text-white">
                {item.times}x
              </span>
              <IconText>
                <IconClockFilled size={16} />{" "}
                <span className="text-sm">{item.hours} hours</span>
              </IconText>
              <span className="text-white text-[16px]">${item.price}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-8">
        <p className="text-orangeColor text-center text-[16px] lg:text-[20px] mb-2">
          Golden Ticker <span className="text-white">unlocks at</span> 500
          boosts
        </p>
        <div className="border-borderColor border bg-lighterColor rounded-md max-w-[400px] m-auto">
          <div className="flex justify-center gap-2 items-center py-2">
            <div className="w-6 h-6 rounded-full bg-lightestColor"></div>
            <span className="text-lightestColor text-[15px] lg:text-[18px]">
              TOKEN / {getUnit(token?.chainId as number)}
            </span>
          </div>
          <div className="flex justify-center gap-2 items-center py-2 bg-lightestColor">
            <img
              src={token?.logo}
              alt="token-avatar"
              className="w-8 h-8 rounded-md"
            />
            <span className="text-[19px] lg:text-[22px]">
              <strong className="text-orangeColor">{token?.symbol}</strong>/
              {getUnit(token?.chainId as number)}
            </span>
          </div>
          <div className="flex justify-center gap-2 items-center py-2">
            <div className="w-6 h-6 rounded-full bg-lightestColor"></div>
            <span className="text-lightestColor text-[15px] lg:text-[18px]">
              TOKEN / {getUnit(token?.chainId as number)}
            </span>
          </div>
        </div>
        <p className="my-6 text-center">
          Boosts active: 100 Boosts needed: 400
        </p>
      </div>
    </>
  );
};

export default BoostList;
