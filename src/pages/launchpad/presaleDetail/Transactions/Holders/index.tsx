import Table from "rc-table";
import {
  IconBrandDatabricks,
  IconExternalLink,
  // IconFilter,
  IconSortAscending,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import copy from "copy-to-clipboard";
import { useAppSelector } from "@/store/hooks";
import { useParams } from "react-router";
import { useCurrentTokenPrice, useTotalSupply } from "@/utils/contractUtils";
import { numberFormat } from "@/utils/func";
import { Progress } from "@material-tailwind/react";
import FormatPrice from "@/components/ui/FormatPrice";
import { toastSuccess } from "@/utils/customToast";
type AlignType = "left" | "center" | "right";

interface HolderTableType {
  rank: React.ReactElement;
  address: React.ReactElement;
  percent: React.ReactElement;
  balance: React.ReactElement;
  value: React.ReactElement;
  // txns: React.ReactElement;
  exp: React.ReactElement;
}

interface HolderType {
  address: `0x${string}`;
  balance: number;
}

const Holders = () => {
  const { chainId, tokenAddress } = useParams();
  const { transactions } = useAppSelector((state) => state.token);
  const { token } = useAppSelector((state) => state.token);
  const [holders, setHolders] = useState<HolderType[]>([]);
  const { tab } = useAppSelector((state) => state.token);
  const { ethPrice } = useAppSelector((state) => state.eth);
  const { currentPrice } = useCurrentTokenPrice(tokenAddress as `0x${string}`);
  const { totalSupply } = useTotalSupply(token?.factory as `0x${string}`);

  useEffect(() => {
    if (transactions.length > 0) {
      const holders: HolderType[] = [];
      transactions.forEach((transaction) => {
        if (!holders.some((holder) => holder.address === transaction.maker)) {
          if (transaction.type === "Buy") {
            holders.push({
              address: transaction.maker,
              balance: transaction.token,
            });
          } else {
           
            holders.push({
              address: transaction.maker,
              balance: -transaction.token,
            });
          }
        } else {
          const holder = holders.find(
            (holder) => holder.address === transaction.maker
          );
          if (!holder) return;
          if (transaction.type === "Buy") {
            holder.balance += transaction.token;
          } else {
            holder.balance -= transaction.token;
          }
        }
      });
      setHolders(holders);
    }
  }, [transactions, currentPrice, ethPrice]);

  const TopHolders: HolderTableType[] = holders.map((holder, index) => ({
    rank: <div className="py-1 px-3 text-textDark">#{index + 1}</div>,
    address: (
      <div
        className="py-1 px-3 cursor-pointer hover:bg-lightestColor"
        onClick={() => {
          copy(holder.address);
          toastSuccess("Address copied to clipboard!");
        }}
      >
        {holder.address.slice(0, 6)}...{holder.address.slice(-4)}
      </div>
    ),
    percent: (
      <div className="py-1 px-3">
        {((holder.balance / Number(totalSupply)) * 100).toFixed(2)}%
      </div>
    ),
    balance: (
      <div className="text-white py-1  px-3 flex items-center gap-2">
        <span className="text-white">{numberFormat(holder.balance)} </span>
        <Progress
          value={(holder.balance / totalSupply) * 100}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          color="green"
          className="h-[6px] bg-gray-600"
        />
        <span className="text-white">{numberFormat(totalSupply)}</span>
      </div>
    ),
    value: (
      <div className="py-1 px-3">
        <FormatPrice
          color="text-white"
          value={
            holder.balance * currentPrice * (ethPrice[Number(chainId)] || 0)
          }
        />
      </div>
    ),
    // txn: (
    //   <div className="cursor-hover h-full items-center flex justify-center hover:bg-lightestColor cursor-pointer">
    //     <IconExternalLink size={18} />
    //   </div>
    // ),
    exp: (
      <div
        className="cursor-hover h-full items-center flex justify-center hover:bg-lightestColor cursor-pointer"
        onClick={() => {
          window.open(
            `https://amoy.polygonscan.com/address/${holder.address}`,
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
      title: (
        <SortHeader title="RANK" sort={false} className="justify-center" />
      ),
      dataIndex: "rank",
      align: "center",
    },
    {
      title: (
        <SortHeader title="ADDRESS" sort={false} className="justify-center" />
      ),
      dataIndex: "address",
      align: "center",
    },
    {
      title: <SortHeader title="PERCENT" className="justify-end" />,
      dataIndex: "percent",
      align: "end",
    },
    {
      title: <SortHeader title="BALANCE" className="justify-center" />,
      dataIndex: "balance",
      align: "end",
    },
    {
      title: <SortHeader title="VALUE" className="justify-end" />,
      dataIndex: "value",
      align: "end",
    },
    // {
    //   title: <SortHeader title="TXNS" className="justify-end" />,
    //   dataIndex: "txns",
    //   align: "end",
    // },
    {
      title: <SortHeader title="EXP" className="justify-center" />,
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
              <td {...props} className="text-sm py-0 md:py-2" />
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
          `holder-${index}-${record.address.props.children}`
        }
        columns={columns.map((col) => ({
          ...col,
          align: col.align as AlignType,
        }))}
        data={TopHolders}
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

export default Holders;
