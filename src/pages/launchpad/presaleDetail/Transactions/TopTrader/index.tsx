import Table from "rc-table";
import {
  IconBrandDatabricks,
  IconExternalLink,
  // IconFilter,
  IconSortAscending,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { Progress } from "@material-tailwind/react";
import clsx from "clsx";
import { useAppSelector } from "@/store/hooks";
import { numberFormat } from "@/utils/func";
import FormatPrice from "@/components/ui/FormatPrice";
import { useParams } from "react-router";
import { useCurrentTokenPrice } from "@/utils/contractUtils";

type AlignType = "left" | "center" | "right";

interface TraderTableType {
  rank: React.ReactElement;
  maker: React.ReactElement;
  bought: React.ReactElement;
  sold: React.ReactElement;
  pnl: React.ReactElement;
  unrealized: React.ReactElement;
  balance: React.ReactElement;
  // txn: React.ReactElement  ;
  exp: React.ReactElement;
}

interface TraderType {
  maker: `0x${string}`;
  bought: {
    usd: number;
    token: number;
    txns: number;
  };
  sold: {
    usd: number;
    token: number;
    txns: number;
  };
  pnl: number;
  unrealized: number;
  balance: {
    total: number;
    balance: number;
  };
}

const TopTraders = () => {
  const { chainId, tokenAddress } = useParams();
  const { transactions } = useAppSelector((state) => state.token);
  const [traders, setTraders] = useState<TraderType[]>([]);
  const { tab } = useAppSelector((state) => state.token);
  const { ethPrice } = useAppSelector((state) => state.eth);
  const { currentPrice } = useCurrentTokenPrice(tokenAddress as `0x${string}`);

  useEffect(() => {
    if (transactions.length > 0) {
      const traders: TraderType[] = [];
      transactions.forEach((transaction) => {
        if (!traders.some((trader) => trader.maker === transaction.maker)) {
          if (transaction.type === "Buy") {
            traders.push({
              maker: transaction.maker,
              bought: {
                usd: transaction.usd,
                token: transaction.token,
                txns: 1,
              },
              sold: {
                usd: 0,
                token: 0,
                txns: 0,
              },
              pnl: -transaction.usd,
              unrealized:
                (Number(ethPrice[chainId as string]) * currentPrice -
                  Number(transaction.price)) *
                Number(transaction.token),
              balance: {
                total: transaction.token,
                balance: transaction.token,
              },
            });
          } else {
            traders.push({
              maker: transaction.maker,
              bought: {
                usd: 0,
                token: 0,
                txns: 0,
              },
              sold: {
                usd: transaction.usd,
                token: transaction.token,
                txns: 1,
              },
              pnl: transaction.usd,
              unrealized: 0,
              balance: {
                total: 0,
                balance: -transaction.token,
              },
            });
          }
        } else {
          const trader = traders.find(
            (trader) => trader.maker === transaction.maker
          );
          if (!trader) return;

          if (transaction.type === "Buy") {
            trader.bought.usd += transaction.usd;
            trader.bought.token += transaction.token;
            trader.bought.txns += 1;
            trader.pnl -= transaction.usd;
            trader.unrealized +=
              (Number(ethPrice[chainId as string]) * currentPrice -
                Number(transaction.price)) *
              Number(transaction.token);
            trader.balance.total += transaction.token;
            trader.balance.balance += transaction.token;
          } else {
            trader.sold.usd += transaction.usd;
            trader.sold.token += transaction.token;
            trader.sold.txns += 1;
            trader.pnl += transaction.usd;
            trader.unrealized -=
              (Number(ethPrice[chainId as string]) * currentPrice -
                Number(transaction.price)) *
              Number(transaction.token);
            trader.balance.balance -= transaction.token;
          }
        }
      });
      setTraders(traders);
    }
  }, [transactions, currentPrice, ethPrice[chainId as string]]);

  const TopTraders: TraderTableType[] = traders.map((trader, index) => ({
    rank: <div className="py-1 px-3 text-textDark">#{index + 1}</div>,
    maker: (
      <div
        className={clsx(
          "py-1 px-3",
          trader.pnl > 0 ? "text-green-300" : "text-red-400"
        )}
      >
        {trader.maker.slice(0, 6)}...{trader.maker.slice(-4)}
      </div>
    ),
    bought: (
      <div className="py-1 px-3 flex flex-col items-end">
        <span className="text-red-400">
          <FormatPrice color="text-red-400" value={trader.bought.usd} />
        </span>
        <span className="text-textDark text-[12px]">
          {numberFormat(trader.bought.token)}/{trader.bought.txns}txns
        </span>
      </div>
    ),
    sold: (
      <div className="py-1 px-3 flex flex-col items-end">
        <span className="text-green-300">
          <FormatPrice color="text-green-300" value={trader.sold.usd} />
        </span>
        <span className="text-textDark text-[12px]">
          {numberFormat(trader.sold.token)}/{trader.sold.txns}txns
        </span>
      </div>
    ),
    pnl: (
      <div className="text-green-300 px-3">
        <div
          className={clsx(trader.pnl > 0 ? "text-green-300" : "text-red-400")}
        >
          {trader.pnl > 0 ? (
            Math.abs(trader.pnl) < 0.1 ? (
              "< $0.1"
            ) : (
              <FormatPrice color="text-green-300" value={trader.pnl} />
            )
          ) : Math.abs(trader.pnl) < 0.1 ? (
            "< $0.1"
          ) : (
            <FormatPrice color="text-red-400" value={-trader.pnl} />
          )}
        </div>
      </div>
    ),
    unrealized: (
      <div className="text-white py-2 px-3">
        {trader.unrealized < 0.1 ? "< $0.1" : <FormatPrice color="text-white" value={trader.unrealized} />}
      </div>
    ),
    balance: (
      <div className="text-white py-1  px-3">
        <p className="text-center mb-[2px]">
          <span className="text-white">
            {numberFormat(trader.balance.balance)}{" "}
          </span>
          <span className="text-[12px] text-textDark">of </span>
          <span className="text-white">
            {numberFormat(trader.balance.total)}
          </span>
        </p>
        <Progress
          value={(trader.balance.balance / trader.balance.total) * 100}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          color="green"
          className="h-[4px] bg-gray-600"
        />
      </div>
    ),
    exp: (
      <div
        className="cursor-hover h-full items-center flex justify-center hover:bg-lightestColor cursor-pointer"
        onClick={() => {
          window.open(
            `https://amoy.polygonscan.com/address/${trader.maker}`,
            "_blank"
          );
        }}
      >
        <IconExternalLink size={18} />
      </div>
    ),
    // txn: (
    //   <div className="cursor-hover h-full items-center flex justify-center hover:bg-lightestColor cursor-pointer">
    //     <IconExternalLink size={18} />
    //   </div>
    // ),
  }));

  const columns = [
    {
      title: (
        <SortHeader title="RANK" sort={false} className="justify-center" />
      ),
      dataIndex: "rank",
      align: "center",
    },
    {
      title: (
        <SortHeader title="MAKER" sort={false} className="justify-center" />
      ),
      dataIndex: "maker",
      align: "center",
    },
    {
      title: <SortHeader title="BOUGHT" className="justify-end" />,
      dataIndex: "bought",
      align: "center",
    },
    {
      title: <SortHeader title="SOLD" className="justify-end" />,
      dataIndex: "sold",
      align: "end",
    },
    {
      title: <SortHeader title="PNL" className="justify-end" />,
      dataIndex: "pnl",
      align: "end",
    },
    {
      title: <SortHeader title="UNREALIZED" className="justify-end" />,
      dataIndex: "unrealized",
      align: "end",
    },
    {
      title: <SortHeader title="BALANCE" className="justify-center" />,
      dataIndex: "balance",
      align: "end",
    },
    // {
    //   title: (
    //     <div className="flex px-4 py-1 justify-center text-white text-[12px]">
    //       TXN
    //     </div>
    //   ),
    //   dataIndex: "txn",
    //   align: "center",
    // },
    {
      title: (
        <div className="flex px-4 py-1 justify-center text-white text-[12px]">
          EXP
        </div>
      ),
      dataIndex: "exp",
      align: "center",
    },
  ];

  return (
    <div
      className={clsx(
        "transaction-table overflow-scroll md:h-[calc((100vh-82.5px)*2/5-40px)] lg:h-[calc((100vh-86.5px)*2/5-40px)] xl:h-[calc((100vh-90.5px)*2/5-40px)]",
        tab === "txn" ? "h-[calc(100vh-116px)]" : "h-[calc((100vh-116px)/2)]"
      )}
    >
      <Table
        emptyText={
          <div className="text-white text-center gap-2 h-[305px] flex items-center justify-center">
            <IconBrandDatabricks size={40} />
            <span className="text-white text-[20px]">No transactions</span>
          </div>
        }
        components={{
          table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
            <table {...props} className="w-full h-full" />
          ),
          body: {
            cell: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
              <td {...props} className="text-sm" />
            ),
            row: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
              <tr
                {...props}
                className="hover:bg-lighterColor bg-lightColor transition"
              />
            ),
          },
          header: {
            cell: (
              props: React.ThHTMLAttributes<HTMLTableHeaderCellElement>
            ) => (
              <th {...props} className="bg-lightestColor text-white min-w-12" />
            ),
            wrapper: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
              <thead {...props} className="sticky -top-[1px]" />
            ),
          },
        }}
        rowKey={(record, index) =>
          `trader-${index}-${record.maker.props.children}`
        }
        columns={columns.map((col) => ({
          ...col,
          align: col.align as AlignType,
        }))}
        data={TopTraders}
        className="fe_c_table"
      />
    </div>
  );
};

const SortHeader = ({
  title,
  sort,
  className,
  ...props
}: {
  title: string;
  className?: string;
  sort?: boolean;
}) => {
  return (
    <div className={clsx("flex gap-2 items-center px-4", className)} {...props}>
      <span className="text-white text-[12px]">{title}</span>
      {sort !== false && <IconSortAscending size={16} />}
    </div>
  );
};

export default TopTraders;
