import Table from "rc-table";
import { IconCoin, IconExternalLink } from "@tabler/icons-react";
import React from "react";
import { getCreatedBefore } from "@/utils/func";
import HeaderDate from "./HeaderDate";
import HeaderType from "./HeaderType";
import HeaderUSD from "./HeaderUSD";
import HeaderMCPepe from "./HeaderMCPepe";
import HeaderPol from "./HeaderPol";
import HeaderMaker from "./HeaderMaker";

interface TransactionType {
  date: React.ReactElement;
  type: React.ReactElement;
  usd: React.ReactElement;
  mcpepe: React.ReactElement;
  pol: React.ReactElement;
  price: React.ReactElement;
  maker: React.ReactElement;
  // marker: {
  //   image: string;
  //   balance: {
  //     total: number;
  //     current: number;
  //     address: string;
  //   };
  // };
  txn: React.ReactElement;
}

type AlignType = "left" | "center" | "right";

const TransactionTable = () => {
  const transactions: TransactionType[] = [
    {
      date: (
        <div className="py-2 px-3">
          {getCreatedBefore(new Date(2024, 2, 4))}
        </div>
      ),
      type: <div className="text-green-300 py-2 px-3">BUY</div>,
      usd: <div className="text-green-300 py-2 px-3"> 5.4</div>,
      mcpepe: <div className="text-green-300 py-2 px-3">2342352</div>,
      pol: <div className="text-green-300 py-2 px-3">0.023</div>,
      price: <div className="text-green-300 py-2 px-3">0.000234</div>,
      maker: <div className="text-green-300 py-2 px-3">0xdf...2dde</div>,
      // marker: {
      //   image: "/assets/images/missile.png",
      //   balance: {
      //     total: 1200000,
      //     current: 100000,
      //     address: "2340rjf9023j492hf923hf39",
      //   },
      // },
      txn: (
        <div className="cursor-hover h-full items-center flex justify-center hover:bg-lightestColor cursor-pointer">
          <IconExternalLink size={18} />
        </div>
      ),
    },
  ];

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
      title: <HeaderMCPepe />,
      dataIndex: "mcpepe",
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
        rowKey={(record) => record.txn.toString()}
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
        data={transactions}
        className="fe_c_table"
      />
    </div>
  );
};

export default TransactionTable;
