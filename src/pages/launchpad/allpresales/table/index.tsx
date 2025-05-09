import Table from "rc-table";
import { IconBrandDatabricks, IconSortAscending } from "@tabler/icons-react";
import React from "react";
import clsx from "clsx";
import IconText from "@/components/common/IconText";
import BoltIcon from "@/components/icons/BoltIcon";
// import { useNavigate } from "react-router";
import { useAppSelector } from "@/store/hooks";
import { getChainLogo, getUnit } from "@/utils/config/chainDexConfig";
import FormatPrice from "@/components/ui/FormatPrice";
import TimeAgo from "@/components/ui/TimeAgo";
type AlignType = "left" | "center" | "right";

interface TableType {
  chainId: number;
  tokenAddress: string;
  type: string;
  token: React.ReactElement;
  progress: React.ReactElement;
  mcap: React.ReactElement;
  age: React.ReactElement;
  txns: React.ReactElement;
  volume: React.ReactElement;
  makerCount: React.ReactElement;
  _5M: React.ReactElement;
  _1H: React.ReactElement;
  _6H: React.ReactElement;
  _24H: React.ReactElement;
}

const NFTTable = () => {
  const { tokens } = useAppSelector((state) => state.token);

  const data: TableType[] = tokens.map((item, index) => {
    return {
      chainId: item.chainId,
      tokenAddress: item.tokenAddress || "",
      type: item.type || "presale",
      token: (
        <div className="py-2 px-3 flex items-center min-w-[160px] md:min-w-[350px] border-l border-r border-borderColor bg-lightColor token-first-item">
          <span className="text-textDark mr-3 text-tedar hidden md:block w-[50px]">
            #{index + 1}
          </span>
          <div>
            <img
              src={getChainLogo(item.chainId)}
              alt="chain-logo"
              className="w-[20px]"
            />
          </div>
          <div>
            <img
              src={item.logo}
              alt="token-avatar"
              className="w-9 h-8 ml-2 rounded-md"
            />
          </div>
          <span className="text-white ml-2">{item.symbol}</span>
          <span className="text-textDark text-[12px]">
            /{getUnit(item.chainId)}
          </span>
          <span className="text-sm overflow-hidden hidden md:block text-ellipsis text-white ml-2 whitespace-nowrap w-[150px]">
            {item.description}
          </span>
          {(item.boost ?? 0) > 0 && (
            <IconText className="text-orangeColor ml-2 hidden md:flex">
              <BoltIcon width={12} />
              <span className="text-orangeColor -ml-2">{item.boost}</span>
            </IconText>
          )}
        </div>
      ),
      progress: <span className="text-white">{item.progress?.toFixed(3)}%</span>,
      mcap: (
        <span className="text-white">
          <FormatPrice value={item.marketCap} />
        </span>
      ),
      age: (
        <span className="text-white">
          <TimeAgo createdAt={new Date(item.createdAt)} />
        </span>
      ),
      txns: <span className="text-white">{item.transactionCount}</span>,
      volume: (
        <span className="text-white">
          <FormatPrice value={item.volume} />
        </span>
      ),
      makerCount: <span className="text-white">{item.makerCount}</span>,
      _5M: (
        <span
          className={clsx(
            "text-greenColor",
            (item._5M ?? 0) > 0
              ? "text-green-500"
              : (item._5M ?? 0) < 0
              ? "text-red-500"
              : "text-white"
          )}
        >
          {item._5M}%
        </span>
      ),
      _1H: (
        <span
          className={clsx(
            "text-greenColor",
            (item._1H ?? 0) > 0
              ? "text-green-500"
              : (item._1H ?? 0) < 0
              ? "text-red-500"
              : "text-white"
          )}
        >
          {item._1H}%
        </span>
      ),
      _6H: (
        <span
          className={clsx(
            "text-greenColor",
            (item._6H ?? 0) > 0
              ? "text-green-500"
              : (item._6H ?? 0) < 0
              ? "text-red-500"
              : "text-white"
          )}
        >
          {item._6H}%
        </span>
      ),
      _24H: (
        <span
          className={clsx(
            "text-greenColor",
            (item._24H ?? 0) > 0
              ? "text-green-500"
              : (item._24H ?? 0) < 0
              ? "text-red-500"
              : "text-white"
          )}
        >
          {item._24H}%
        </span>
      ),
    };
  });

  const columns = [
    {
      title: (
        <SortHeader
          title="TOKEN"
          sort={false}
          className=" border-l border-r border-[#515157] h-full"
        />
      ),
      dataIndex: "token",
      align: "left" as AlignType,
    },
    {
      title: <SortHeader title="PROGRESS" className="justify-end" />,
      dataIndex: "progress",
      align: "right" as AlignType,
    },
    {
      title: <SortHeader title="MCAP" className="justify-end" />,
      dataIndex: "mcap",
      align: "right" as AlignType,
    },
    {
      title: <SortHeader title="AGE" className="justify-end" />,
      dataIndex: "age",
      align: "right" as AlignType,
    },
    {
      title: <SortHeader title="TXNS" className="justify-end" />,
      dataIndex: "txns",
      align: "right" as AlignType,
    },
    {
      title: <SortHeader title="VOLUME" className="justify-end" />,
      dataIndex: "volume",
      align: "right" as AlignType,
    },
    {
      title: <SortHeader title="MAKERS" className="justify-end" />,
      dataIndex: "makerCount",
      align: "right" as AlignType,
    },
    {
      title: <SortHeader title="5M" className="justify-end" />,
      dataIndex: "_5M",
      align: "right" as AlignType,
    },
    {
      title: <SortHeader title="1H" className="justify-end" />,
      dataIndex: "_1H",
      align: "right" as AlignType,
    },
    {
      title: <SortHeader title="6H" className="justify-end" />,
      dataIndex: "_6H",
      align: "right" as AlignType,
    },
    {
      title: <SortHeader title="24H" className="justify-end" />,
      dataIndex: "_24H",
      align: "right" as AlignType,
    },
  ];

  // const navigate = useNavigate();

  const handleClick = (data: TableType) => {
    window.location.href = `/detail/${data.chainId}/${data.tokenAddress}/${data.type}`;
    // navigate(`/detail/${data.chainId}/${data.tokenAddress}/${data.type}`);
  };
  return (
    <div className="mb-10 token-table overflow-x-scroll -mx-4">
      <Table
        emptyText={
          <div className="text-white text-center gap-2 h-[305px] flex items-center justify-center">
            <IconBrandDatabricks size={40} color="grey" />
            <span className="text-textDark text-[20px]">No transactions</span>
          </div>
        }
        components={{
          table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
            <table {...props} className="w-full h-full" />
          ),
          body: {
            cell: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
              <td {...props} className="token-td text-sm px-3" />
            ),
            row: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
              <tr
                {...props}
                className="token-tr bg-lightColor transition cursor-pointer"
              />
            ),
          },
          header: {
            cell: (
              props: React.ThHTMLAttributes<HTMLTableHeaderCellElement>
            ) => (
              <th
                {...props}
                className="bg-lightestColor text-white min-w-12 py-2"
              />
            ),
            wrapper: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
              <thead {...props} className="sticky -top-[1px]" />
            ),
          },
        }}
        columns={columns}
        data={data}
        className="fe_c_table"
        onRow={(record) => ({
          onClick: () => handleClick(record),
        })}
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
    <div
      className={clsx(
        "flex gap-1 items-center px-2 min-w-24 cursor-pointer",
        className
      )}
      {...props}
    >
      <span className="text-white text-[12px]">{title}</span>
      {sort !== false && <IconSortAscending size={16} />}
    </div>
  );
};

export default NFTTable;
