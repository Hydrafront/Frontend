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
  { icon: <UnionSvg className="text-purple-500 mr-1 w-[18px]" />, title: "Launched" }
]

interface PropsType {
  step: string;
  setStep: (value: string) => void
}

const Steps: React.FC<PropsType> = ({ step, setStep }) => {
  return (
    <div className="w-full flex justify-around py-5">
      {
        options.map((item: optionsType) => (
          <div className={clsx("flex justify-center py-3 cursor-pointer w-[200px]", step === item.title && "border-b border-borderColor")} onClick={() => setStep(item.title)}>
            <div className="flex items-center text-[13px]">{item.icon}{item.title}</div>
          </div>
        ))
      }
    </div>
  )
}
export default Steps;