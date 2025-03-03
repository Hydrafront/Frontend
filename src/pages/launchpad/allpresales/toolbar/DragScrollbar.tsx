import CustomButton from "@/components/common/CustomButton";
import CustomPopover from "@/components/common/CustomPopover";
import AdIcon from "@/components/icons/AdIcon";
import BoltIcon from "@/components/icons/BoltIcon";
import LeafIcon from "@/components/icons/LeafIcon";
import ScrollOnDrag from "@/components/ui/ScrollOnDrag";
import { List, ListItem } from "@material-tailwind/react";
import {
  IconChartBar,
  IconCheck,
  IconFilterFilled,
  IconFlag2,
  IconFlame,
  IconTrendingUp,
} from "@tabler/icons-react";
import clsx from "clsx";
import React, { useState } from "react";

const DragScrollbar: React.FC = () => {
  const [chain, setChain] = useState<string>("all");
  const [sort, setSort] = useState<string>("Trending");
  const [subSort, setSubsort] = useState<string>("");

  const handleChangeChain = (value: string) => () => {
    setChain(value);
  };

  const handleChangeSort = (value: string) => () => {
    setSort(value);
    if (value === "Top") setSubsort("progress");
    if (value === "Rising") setSubsort("5M");
    if (value === "Finalized") setSubsort("trending");
  };

  const handleChangeSubSort = (value: string) => {
    setSubsort(value);
  };

  const SortButton = ({
    name,
    icon,
    options,
  }: {
    name: string;
    icon: React.ReactNode;
    options?: { label: string; value: string }[];
  }) => {
    return (
      <div
        className={clsx(
          "rounded-md cursor-pointer text-sm px-4 py-1 flex items-center",
          sort === name
            ? "bg-greenColor text-black cursor-move"
            : "text-textColor bg-lighterColor"
        )}
        onClick={handleChangeSort(name)}
      >
        {icon}
        <span
          className={clsx(
            "ml-2 text-sm",
            sort === name ? "text-black" : "text-textColor"
          )}
        >
          {name}
        </span>
        {options && sort === name && (
          <div className="flex">
            {options.map((item, index) => (
              <div
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  handleChangeSubSort(item.value);
                }}
                className={clsx(
                  "px-2 whitespace-nowrap py-1 ml-2 rounded-md cursor-pointer hover:bg-[#03763e] hover:text-textColor transition",
                  subSort === item.value
                    ? "bg-[#03763e] text-textColor"
                    : "bg-[#01a857] text-black"
                )}
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const FilterButton: React.FC<{ name: string; options: string[] }> = ({
    name,
    options,
  }) => {
    const dividerOption = ["Any", "≤3d"];
    return (
      <CustomPopover
        trigger={
          <button className="border-borderColor border rounded-md px-3 flex gap-2 items-center whitespace-nowrap">
            <IconFilterFilled size={16} />
            {name}
          </button>
        }
      >
        <List
          className="p-0 w-full min-w-[100px]"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {options.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                className="text-[14px] px-6 rounded-none py-1 whitespace-nowrap"
              >
                {item}
              </ListItem>
              {dividerOption.includes(item) && (
                <hr className="border-borderColor" />
              )}
            </React.Fragment>
          ))}
        </List>
      </CustomPopover>
    );
  };

  return (
    <ScrollOnDrag className="flex pb-4 pt-1 cursor-move">
      <div className="flex p-[1px] bg-lighterColor rounded-md">
        <div
          className={clsx(
            "rounded-l-lg cursor-pointer whitespace-nowrap px-3 text-sm py-2 bg-bgColor hover:bg-lighterColor",
            chain === "all" && "bg-lighterColor"
          )}
          onClick={handleChangeChain("all")}
        >
          All chains
        </div>
        <div
          className={clsx(
            "cursor-pointer px-3 py-2 bg-bgColor whitespace-nowrap text-sm hover:bg-lighterColor",
            chain === "polygon" && "bg-lighterColor"
          )}
          onClick={handleChangeChain("polygon")}
        >
          Polygon
        </div>
        {/* <div
          className={clsx(
            "rounded-r-lg cursor-pointer whitespace-nowrap px-3 py-2 text-sm bg-bgColor hover:bg-lighterColor",
            chain === "unichain" && "bg-lighterColor"
          )}
          onClick={handleChangeChain("unichain")}
        >
          Unichain
        </div> */}
      </div>
      <div className="ml-3 flex gap-2">
        {SortButton({
          name: "Trending",
          icon: <IconFlame color={sort === "Trending" ? "black" : "white"} />,
        })}
        {SortButton({
          name: "Top",
          icon: <IconChartBar color={sort === "Top" ? "black" : "white"} />,
          options: [
            { label: "Progress", value: "progress" },
            { label: "Volume", value: "volume" },
            { label: "Txns", value: "txns" },
          ],
        })}
        {SortButton({
          name: "Rising",
          icon: (
            <IconTrendingUp color={sort === "Rising" ? "black" : "white"} />
          ),
          options: [
            { label: "5M", value: "5M" },
            { label: "1H", value: "1H" },
            { label: "6H", value: "6H" },
            { label: "24H", value: "24H" },
          ],
        })}
        {SortButton({
          name: "New",
          icon: (
            <LeafIcon width={16} fill={sort === "New" ? "black" : "white"} />
          ),
        })}
        {SortButton({
          name: "Finalized",
          icon: <IconFlag2 color={sort === "Finalized" ? "black" : "white"} />,
          options: [
            { label: "Trending", value: "trending" },
            { label: "Newest", value: "newest" },
            { label: "Top Mcap", value: "top_mcap" },
            { label: "oldest", value: "oldest" },
          ],
        })}
        <FilterButton name="DEX" options={["Any", "Uniswap"]} />
        <FilterButton
          name="Age"
          options={[
            "Any",
            "≤15m",
            "≤30m",
            "≤1h",
            "≤3h",
            "≤6h",
            "≤12h",
            "≤24h",
            "≤3d",
            "≥15m",
            "≥30m",
            "≥1h",
            "≥3h",
            "≥6h",
            "≥12h",
            "≥24h",
            "≥3d",
          ]}
        />
        <FilterButton
          name="Min progress"
          options={["Any", "10%", "25%", "50%", "75%", "90%"]}
        />
        <FilterButton
          name="Max progress"
          options={["Any", "10%", "25%", "50%", "75%", "90%"]}
        />
        <div className="flex">
          <CustomButton className="rounded-r-none">
            <BoltIcon />
            <span className="text-white -ml-2 hidden md:block">Boosted</span>
            <IconCheck size={16} />
          </CustomButton>
          <CustomButton className="rounded-l-none">
            <AdIcon fill="#00D26C" />
            <span className="text-white hidden md:block">Ads</span>
            <IconCheck size={16} />
          </CustomButton>
        </div>
      </div>
    </ScrollOnDrag>
  );
};

export default DragScrollbar;
