import Table from "rc-table";
import {
  IconExternalLink,
  IconFilter,
  IconSortAscending,
} from "@tabler/icons-react";
import React from "react";
import { Progress } from "@material-tailwind/react";
import clsx from "clsx";

type AlignType = 'left' | 'center' | 'right';

interface TransactionType {
  rank: React.ReactElement;
  maker: React.ReactElement;
  bought: React.ReactElement;
  sold: React.ReactElement;
  pnl: React.ReactElement;
  unrealized: React.ReactElement;
  balance: React.ReactElement;
  exp: React.ReactElement;
  txn: React.ReactElement;
}

const TopTraders = () => {
  const TopTraders: TransactionType[] = [
    {
      rank: <div className="py-1 px-3">#1</div>,
      maker: <div className="py-1 px-3">234...2sd</div>,
      bought: (
        <div className="py-1 px-3 flex flex-col items-end">
          <span className="text-red-400">$234</span>
          <span className="text-textDark text-[12px]">6.0M/15txns</span>
        </div>
      ),
      sold: (
        <div className="py-1 px-3 flex flex-col items-end">
          <span className="text-green-300">$234</span>
          <span className="text-textDark text-[12px]">6.0M/15txns</span>
        </div>
      ),
      pnl: <div className="text-green-300 px-3">$234</div>,
      unrealized: <div className="text-white py-2 px-3">{"< $0.1"}</div>,
      balance: (
        <div className="text-white py-1  px-3">
          <p className="text-center mb-[2px]">
            <span className="text-white">0 </span>
            <span className="text-[12px] text-textDark">of </span>
            <span className="text-white">234.3K</span>
          </p>
          <Progress
           placeholder={undefined}
           onPointerEnterCapture={undefined}
           onPointerLeaveCapture={undefined}
           className="h-[4px] bg-gray-600" />
        </div>
      ),
      exp: (
        <div className="cursor-hover h-full items-center flex justify-center hover:bg-lightestColor cursor-pointer">
          <IconFilter size={18} />
        </div>
      ),
      txn: (
        <div className="cursor-hover h-full items-center flex justify-center hover:bg-lightestColor cursor-pointer">
          <IconExternalLink size={18} />
        </div>
      ),
    },
  ];

  const columns = [
    {
      title: <SortHeader title="RANK" sort={false} className="justify-center" />,
      dataIndex: "rank",
      align: "center",
    },
    {
      title: <SortHeader title="MAKER" sort={false} className="justify-center" />,
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
    {
      title: (
        <div className="flex px-4 py-1 justify-center text-white text-[12px]">
          TXN
        </div>
      ),
      dataIndex: "txn",
      align: "center",
    },
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
    <div className="transaction-table overflow-scroll h-[334px]">
      <Table
        components={{
          table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
            <table {...props} className="w-full h-full" />
          ),
          body: {
            cell: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
              <td {...props} className="text-sm" />
            ),
            row: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
              <tr {...props} className="hover:bg-lighterColor bg-lightColor transition" />
            ),
          },
          header: {
            cell: (props: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
              <th {...props} className="bg-lightestColor text-white min-w-12" />
            ),
            wrapper: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
              <thead {...props} className="sticky -top-[1px]" />
            ),
          },
        }}
        columns={columns.map(col => ({ ...col, align: col.align as AlignType }))}
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
      {
        sort !== false &&
      <IconSortAscending size={16} />
      }
    </div>
  );
};

export default TopTraders;
