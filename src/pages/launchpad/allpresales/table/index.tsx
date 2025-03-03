import Table from "rc-table";
import { IconSortAscending } from "@tabler/icons-react";
import React from "react";
import clsx from "clsx";
import IconText from "@/components/common/IconText";
import BoltIcon from "@/components/icons/BoltIcon";
import { useNavigate } from "react-router";
import Pagination from "@/components/common/Pagination";

type AlignType = 'left' | 'center' | 'right';

interface TransactionType {
  token: React.ReactElement;
  progress: React.ReactElement;
  mcap: React.ReactElement;
  age: React.ReactElement;
  txns: React.ReactElement;
  volume: React.ReactElement;
  makers: React.ReactElement;
  _5M: React.ReactElement;
  _1H: React.ReactElement;
  _6H: React.ReactElement;
  _24H: React.ReactElement;
}

const NFTTable = () => {
  const data: TransactionType[] = [
    {
      token: (
        <div className="py-2 px-3 flex items-center min-w-[160px] md:min-w-[350px] border-l border-r border-borderColor bg-lightColor token-first-item">
          <span className="text-textDark mr-3 text-tedar hidden md:block">
            #1
          </span>
          <div>
            <img
              src="/assets/images/chains/Polygon.png"
              alt="chain-logo"
              className="w-[20px]"
            />
          </div>
          <div>
            <img
              src="/assets/images/avatars/dog.jpg"
              alt="token-avatar"
              className="w-9 h-8 ml-2 rounded-md"
            />
          </div>
          <span className="text-white ml-2">FUC</span>
          <span className="text-textDark text-[12px]">/POL</span>
          <span className="tex-sm text-white ml-2 whitespace-nowrap hidden md:block">
            Fluffy Unicom Co
          </span>
          <IconText className="text-orangeColor ml-2 hidden md:flex">
            <BoltIcon width={12} />
            <span className="text-orangeColor -ml-2">130</span>
          </IconText>
        </div>
      ),
      progress: <span className="text-white">93.23%</span>,
      mcap: <span className="text-white">$51K</span>,
      age: <span className="text-white">10h</span>,
      txns: <span className="text-white">7878</span>,
      volume: <span className="text-white">$23K</span>,
      makers: <span className="text-white">217</span>,
      _5M: <span className="text-greenColor">23%</span>,
      _1H: <span className="text-greenColor">23%</span>,
      _6H: <span className="text-greenColor">23%</span>,
      _24H: <span className="text-greenColor">23%</span>,
    },
  ];

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
      dataIndex: "makers",
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

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/detail/Polygon/sdfsdfsdfsdfsdfsdfsdfdsfdf/presale");
  };
  return (
    <>
      <div className="token-table overflow-x-scroll -mx-4">
        <Table
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
                  onClick={handleClick}
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
              wrapper: (
                props: React.HTMLAttributes<HTMLTableSectionElement>
              ) => <thead {...props} className="sticky -top-[1px]" />,
            },
          }}
          columns={columns}
          data={data}
          className="fe_c_table"
        />
      </div>
      <div className="w-full my-10 flex justify-center">
        <Pagination pageCount={5} />
      </div>
    </>
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
