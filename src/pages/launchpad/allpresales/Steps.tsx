import BellTimeSvg from "@/components/icons/BellTime-svg";
import ShopRocketSvg from "@/components/icons/ShopRocket-svg";
import UnionSvg from "@/components/icons/Union-svg";
import clsx from "clsx";
import React from "react";

interface optionsType {
  icon: React.ReactNode;
  title: string;
}

const options: optionsType[] = [
  { icon: <ShopRocketSvg className="text-green-500 mr-1 w-[18px]" />, title: "Live" },
  { icon: <BellTimeSvg className="text-orange-500 mr-1 w-[18px]" />, title: "Upcoming" },
  { icon: <UnionSvg className="text-purple-500 mr-1 w-[18px]" />, title: "Completed" }
]
interface PropsType {
  step: string;
  setStep: (value: string) => void;
}

const Steps: React.FC<PropsType> = (props) => {

  const handleClick = (title: string) => () => {
    props.setStep(title);
  }

  return (
    <div className="w-full flex py-5">
      {
        options.map((item: optionsType, index: number) => (
          <div key={index} className="w-1/3 flex justify-center">
            <div
              className={clsx("flex items-center text-[13px] cursor-pointer px-4 lg:px-10 py-1", props.step === item.title && "border-b-2 border-borderColor")}
              onClick={handleClick(item.title)}>
              {item.icon}{item.title}
            </div>
          </div>
        ))
      }
    </div>
  )
}
export default Steps;