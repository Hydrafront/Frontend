import Table from "rc-table";
import {
  IconBrandDatabricks,
  IconCoin,
  IconExternalLink,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import HeaderDate from "./HeaderDate";
import HeaderType from "./HeaderType";
import HeaderUSD from "./HeaderUSD";
import HeaderPol from "./HeaderPol";
import HeaderMaker from "./HeaderMaker";
import { useAppSelector } from "@/store/hooks";
import FormatPrice from "@/components/ui/FormatPrice";
import TimeAgo from "@/components/ui/TimeAgo";
import HeaderToken from "./HeaderToken";
import clsx from "clsx";
import { TransactionType } from "@/interfaces/types";

type AlignType = "left" | "center" | "right";

const TransactionTable = () => {
  const { transactions } = useAppSelector((state) => state.token);
  const { token } = useAppSelector((state) => state.token);
  const [sortedTxns, setSortedTxns] = useState<TransactionType[]>([]);

  useEffect(() => {
    if (transactions.length > 0) {
      const sortedTxns = [...transactions];
      sortedTxns.sort(
        (a, b) =>
          new Date(b.createdAt || "").getTime() -
          new Date(a.createdAt || "").getTime()
      );
      setSortedTxns(sortedTxns);
    }
  }, [transactions]);

  const data = sortedTxns.map((transaction) => ({
    date: (
      <div className="py-2 px-3">
        <TimeAgo createdAt={new Date(transaction.createdAt || "")} />
      </div>
    ),
    type: (
      <div
        className={clsx(
          "py-2 px-3",
          transaction.type === "Buy" ? "text-green-300" : "text-red-300"
        )}
      >
        {transaction.type}
      </div>
    ),
    usd: (
      <div
        className={clsx(
          "py-2 px-3",
          transaction.type === "Buy" ? "text-green-300" : "text-red-300"
        )}
      >
        <FormatPrice
          value={transaction.usd}
          color={transaction.type === "Buy" ? "text-green-300" : "text-red-300"}
        />
      </div>
    ),
    token: (
      <div
        className={clsx(
          "py-2 px-3",
          transaction.type === "Buy" ? "text-green-300" : "text-red-300"
        )}
      >
        {Math.floor(transaction.token)}
      </div>
    ),
    pol: (
      <div
        className={clsx(
          "py-2 px-3",
          transaction.type === "Buy" ? "text-green-300" : "text-red-300"
        )}
      >
        {transaction.eth.toFixed(4)}
      </div>
    ),
    price: (
      <div
        className={clsx(
          "py-2 px-3",
          transaction.type === "Buy" ? "text-green-300" : "text-red-300"
        )}
      >
        <FormatPrice
          value={transaction.price}
          color={transaction.type === "Buy" ? "text-green-300" : "text-red-300"}
        />
      </div>
    ),
    maker: (
      <div
        className={clsx(
          "py-2 px-3",
          transaction.type === "Buy" ? "text-green-300" : "text-red-300"
        )}
      >
        {transaction.maker.slice(0, 6)}...{transaction.maker.slice(-4)}
      </div>
    ),
    txn: (
      <div
        className="cursor-hover h-full items-center flex justify-center hover:bg-lightestColor cursor-pointer"
        onClick={() => {
          window.open(
            `https://amoy.polygonscan.com/tx/${transaction.txHash}`,
            "_blank"
          );
        }}
      >
        <IconExternalLink size={18} />
      </div>
    ),
  }));

  const columns = [
    {
      title: <HeaderDate />,
      dataIndex: "date",
      align: "start",
    },
    {
      title: <HeaderType />,
      dataIndex: "type",
      align: "center",
    },
    {
      title: <HeaderUSD />,
      dataIndex: "usd",
      align: "end",
    },
    {
      title: <HeaderToken name={token?.symbol || ""} />,
      dataIndex: "token",
      align: "end",
    },
    {
      title: <HeaderPol />,
      dataIndex: "pol",
      align: "end",
    },
    {
      title: (
        <div className="flex items-center justify-end gap-2 px-4">
          <span className="text-white text-[12px]">PRICE</span>
          <IconCoin size={16} />
        </div>
      ),
      dataIndex: "price",
      align: "end",
    },
    {
      title: <HeaderMaker />,
      dataIndex: "maker",
      align: "end",
    },
    {
      title: (
        <div className="flex px-4 py-1 justify-center text-white text-[12px]">
          TXN
        </div>
      ),
      dataIndex: "txn",
      align: "center",
    },
  ];

  return (
    <div className="transaction-table overflow-scroll h-[350px]">
      <Table
        emptyText={
          <div className="text-white text-center gap-2 h-[305px] flex items-center justify-center">
            <IconBrandDatabricks size={40} />
            <span className="text-white text-[20px]">No transactions</span>
          </div>
        }
        rowKey={(record, index) => `${record.txn.toString()}-${index}`}
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
            ) => <th {...props} className="bg-lightestColor text-white" />,
            wrapper: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
              <thead {...props} className="sticky -top-[1px]" />
            ),
          },
        }}
        columns={columns.map((col) => ({
          ...col,
          align: col.align as AlignType,
        }))}
        data={data}
        className="fe_c_table"
      />
    </div>
  );
};

export default TransactionTable;
