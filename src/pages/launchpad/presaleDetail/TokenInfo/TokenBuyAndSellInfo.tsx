import InfoText from "@/components/common/InfoText";
import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { TransactionType } from "@/interfaces/types";
import FormatPrice from "@/components/ui/FormatPrice";
import socket from "@/socket/token";
import { useParams } from "react-router";
interface DurationType {
  label: string;
  value: number;
  percent: number;
  selected: boolean;
}

interface TransactionStats {
  buyTransactions: TransactionType[];
  sellTransactions: TransactionType[];
  buyVolume: number;
  sellVolume: number;
  buyers: number;
  sellers: number;
}

const TokenBuyAndSellInfo = () => {
  const { tokenAddress } = useParams();
  const [durationOption, setDurationOption] = useState<DurationType[]>([
    { label: "5M", value: 5, percent: 0, selected: true },
    { label: "1H", value: 60, percent: 0, selected: false },
    { label: "6H", value: 360, percent: 0, selected: false },
    { label: "24H", value: 1440, percent: 0, selected: false },
  ]);
  const { transactions } = useAppSelector((state) => state.token);
  const [txns, setTxns] = useState<TransactionType[]>([]);
  const [stats, setStats] = useState<TransactionStats>({
    buyTransactions: [],
    sellTransactions: [],
    buyVolume: 0,
    sellVolume: 0,
    buyers: 0,
    sellers: 0,
  });

  const getVolume = useCallback(() => {
    let buyVolume: number = 0;
    let sellVolume: number = 0;
    txns.forEach((transaction) => {
      if (transaction.type === "Buy") {
        buyVolume += transaction.usd;
      } else {
        sellVolume += transaction.usd;
      }
    });
    return { buyVolume, sellVolume };
  }, [txns]);

  const getMakers = useCallback(() => {
    const buyers: string[] = [];
    const sellers: string[] = [];
    txns.forEach((item) => {
      if (!buyers.includes(item.maker) && item.type === "Buy") {
        buyers.push(item.maker);
      }
    });

    txns.forEach((item) => {
      if (!sellers.includes(item.maker) && item.type === "Sell") {
        sellers.push(item.maker);
      }
    });
    return {
      buyers: buyers.length,
      sellers: sellers.length,
    };
  }, [txns]);

  useEffect(() => {
    const d = durationOption.find((option) => option.selected);
    const time = new Date().getTime() - (d?.value ?? 0) * 60 * 1000;
    const sortedTxns = [...transactions];
    sortedTxns.sort(
      (a, b) =>
        new Date(b.createdAt ?? "").getTime() -
        new Date(a.createdAt ?? "").getTime()
    );
    setTxns(
      sortedTxns.filter(
        (transaction) => new Date(transaction.createdAt ?? "").getTime() > time
      )
    );
  }, [transactions, durationOption]);

  useEffect(() => {
    const sortedTxns = [...transactions].sort(
      (a, b) =>
        new Date(b.createdAt ?? "").getTime() -
        new Date(a.createdAt ?? "").getTime()
    );
    const options = durationOption.map((item) => {
      const filteredTxns = sortedTxns.filter(
        (transaction) =>
          new Date(transaction.createdAt ?? "").getTime() >
          new Date().getTime() - item.value * 60 * 1000
      );
      let percent = 0;
      if (filteredTxns.length >= 1) {
        const lastTxn = filteredTxns[0];
        let startTxn = null;
        if (filteredTxns.length === sortedTxns.length) {
          startTxn = sortedTxns[sortedTxns.length - 1];
        } else {
          startTxn = sortedTxns[filteredTxns.length];
        }
        if (lastTxn?.price && startTxn?.price) {
          percent = ((lastTxn.price - startTxn.price) / startTxn.price) * 100;
        }
      }
      return {
        ...item,
        percent: Number(percent.toFixed(2)),
      };
    });

    socket.emit("update-token-info", {
      tokenAddress: tokenAddress as `0x${string}`,
      _5M: options[0].percent,
      _1H: options[1].percent,
      _6H: options[2].percent,
      _24H: options[3].percent,
    });

    setDurationOption(options);
  }, [transactions]);

  useEffect(() => {
    setStats({
      buyTransactions: txns.filter((transaction) => transaction.type === "Buy"),
      sellTransactions: txns.filter(
        (transaction) => transaction.type === "Sell"
      ),
      buyVolume: getVolume().buyVolume,
      sellVolume: getVolume().sellVolume,
      buyers: getMakers().buyers,
      sellers: getMakers().sellers,
    });
  }, [txns]);

  const handleSelectDuration = (item: DurationType) => {
    setDurationOption(
      durationOption.map((option) => ({
        ...option,
        selected: option.value === item.value,
      }))
    );
  };

  return (
    <div className="border border-borderColor rounded-md overflow-hidden">
      <div className="flex border-b border-borderColor">
        {durationOption.map((item, index) => (
          <button
            onClick={() => handleSelectDuration(item)}
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
            <span className="text-white">{txns.length}</span>
          </div>
          <div className="flex flex-col">
            <InfoText>Volume</InfoText>
            <span className="text-white">
              <FormatPrice value={stats.buyVolume + stats.sellVolume} />
            </span>
          </div>
          <div className="flex flex-col">
            <InfoText>MAKERS</InfoText>
            <span className="text-white">
              {getMakers().buyers + getMakers().sellers}
            </span>
          </div>
        </div>
        <div className="flex-1 grid gap-3">
          <BuySellPercent
            buy={{ label: "BUYS", value: stats.buyTransactions.length }}
            sell={{ label: "SELLS", value: stats.sellTransactions.length }}
          />
          <BuySellPercent
            buy={{ label: "BUY VOL", value: stats.buyVolume }}
            sell={{ label: "SELL VOL", value: stats.sellVolume }}
          />
          <BuySellPercent
            buy={{ label: "BUYERS", value: stats.buyers }}
            sell={{ label: "SELLERS", value: stats.sellers }}
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
const BuySellPercent: React.FC<BuySellProps> = React.memo((props) => {
  const [buyWidth, setBuyWidth] = useState<number>(0);
  const [sellWidth, setSellWidth] = useState<number>(0);
  useEffect(() => {
    if (!props.buy.value && !props.sell.value) {
      setBuyWidth(0);
      setSellWidth(0);
    } else {
      const buyWidth =
        (props.buy.value / (props.buy.value + props.sell.value)) * 100;
      const sellWidth =
        (props.sell.value / (props.buy.value + props.sell.value)) * 100;
      setBuyWidth(buyWidth);
      setSellWidth(sellWidth);
    }
  }, [props.buy.value, props.sell.value]);
  return (
    <div className="w-full">
      <div className="flex justify-between w-full">
        <div className="flex flex-col">
          <InfoText>{props.buy.label}</InfoText>
          <span className="text-white">
            {props.buy.label === "BUY VOL" ? (
              <FormatPrice value={props.buy.value} />
            ) : (
              props.buy.value
            )}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <InfoText>{props.sell.label}</InfoText>
          <span className="text-white">
            {props.sell.label === "SELL VOL" ? (
              <FormatPrice value={props.sell.value} />
            ) : (
              props.sell.value
            )}
          </span>
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
});

export default TokenBuyAndSellInfo;
