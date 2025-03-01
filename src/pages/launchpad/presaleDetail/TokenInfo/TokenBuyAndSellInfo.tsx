import InfoText from "@/components/common/InfoText";
import { numberFormat } from "@/utils/func";
import clsx from "clsx";
import React, { useState } from "react";

interface DurationType {
  label: string;
  value: number;
  percent: number;
  selected: boolean;
}

const TokenBuyAndSellInfo = () => {
  const [duration] = useState<DurationType[]>([
    { label: "5M", value: 0.2, percent: -0.34, selected: true },
    { label: "1H", value: 1, percent: 11.34, selected: false },
    { label: "6H", value: 6, percent: 23.34, selected: false },
    { label: "24H", value: 24, percent: 323, selected: false },
  ]);

  return (
    <div className="border border-borderColor rounded-md overflow-hidden">
      <div className="flex border-b border-borderColor">
        {duration.map((item, index) => (
          <button
            key={index}
            className={clsx(
              "flex flex-col py-1 justify-center w-1/4 border-borderColor hover:bg-lightColor transition",
              index !== 0 && "border-l",
              item.selected && "bg-lighterColor"
            )}
          >
            <span className="text-textDark">{item.label}</span>
            <span
              className={item.percent >= 0 ? "text-green-400" : "text-red-400"}
            >
              {item.percent}%
            </span>
          </button>
        ))}
      </div>
      <div className="p-3 flex gap-3">
        <div className="grid border-r border-borderColor pr-4 gap-3">
          <div className="flex flex-col">
            <InfoText>TXNS</InfoText>
            <span className="text-white">164</span>
          </div>
          <div className="flex flex-col">
            <InfoText>Volume</InfoText>
            <span className="text-white">${numberFormat(23000)}k</span>
          </div>
          <div className="flex flex-col">
            <InfoText>TXNS</InfoText>
            <span className="text-white">32</span>
          </div>
        </div>
        <div className="flex-1 grid gap-3">
          <BuySellPercent
            buy={{ label: "BUYS", value: 99 }}
            sell={{ label: "SELLS", value: 112 }}
          />
          <BuySellPercent
            buy={{ label: "BUY VOL", value: 5643 }}
            sell={{ label: "SELL VOL", value: 2334 }}
          />
          <BuySellPercent
            buy={{ label: "BUYERS", value: 34 }}
            sell={{ label: "SELLERS", value: 56 }}
          />
        </div>
      </div>
    </div>
  );
};

interface BuySellProps {
  buy: { label: string; value: number };
  sell: { label: string; value: number };
}
const BuySellPercent: React.FC<BuySellProps> = (props) => {
  const buyWidth =
    (props.buy.value / (props.buy.value + props.sell.value)) * 100;
  const sellWidth =
    (props.sell.value / (props.buy.value + props.sell.value)) * 100;
  return (
    <div className="w-full">
      <div className="flex justify-between w-full">
        <div className="flex flex-col">
          <InfoText>{props.buy.label}</InfoText>
          <span className="text-white">{props.buy.value}</span>
        </div>
        <div className="flex flex-col items-end">
          <InfoText>{props.sell.label}</InfoText>
          <span className="text-white">{props.buy.value}</span>
        </div>
      </div>
      <div className="flex gap-[2px]">
        <div
          className={`bg-green-400 h-1 rounded-md`}
          style={{ width: buyWidth + "%" }}
        ></div>
        <div
          className={`bg-red-400 h-1 rounded-md`}
          style={{ width: sellWidth + "%" }}
        ></div>
      </div>
    </div>
  );
};

export default TokenBuyAndSellInfo;
