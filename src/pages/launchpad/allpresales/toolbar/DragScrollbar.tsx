import CustomButton from "@/components/common/CustomButton";
import CustomPopover from "@/components/common/CustomPopover";
import AdIcon from "@/components/icons/AdIcon";
import BoltIcon from "@/components/icons/BoltIcon";
import LeafIcon from "@/components/icons/LeafIcon";
import ScrollOnDrag from "@/components/ui/ScrollOnDrag";
import { useAppDispatch } from "@/store/hooks";
import { setFilters } from "@/store/reducers/token-slice";
import { supportedChains } from "@/utils/config/chainDexConfig";
import { getUrlSearchParams, setUrlSearchParams } from "@/utils/func";
import { List, ListItem, useAccordion } from "@material-tailwind/react";
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
  const dispatch = useAppDispatch();
  const [sort, setSort] = useState<string>("Trending");
  const [subSort, setSubsort] = useState<string>("");
  const [boosted, setBoosted] = useState<boolean>(false);
  const [ads, setAds] = useState<boolean>(false);
  const { chainId } = getUrlSearchParams();

  const handleChangeChain = (chainId: string | undefined) => () => {
    dispatch(setFilters({ chainId: chainId || undefined }));
    setUrlSearchParams({ chainId: chainId || undefined });
    // setChainId(chainId);
  };

  const handleChangeSort = (value: string) => () => {
    setSort(value);
    if (value === "Top") {
      setSubsort("progress");
      dispatch(setFilters({ sort: "progress" }));
      setUrlSearchParams({ sort: "progress" });
    } else if (value === "Rising") {
      setSubsort("_5M");
      dispatch(setFilters({ sort: "_5M" }));
      setUrlSearchParams({ sort: "_5M" });
    } else if (value === "Trending") {
      dispatch(setFilters({ sort: "trending" }));
      setUrlSearchParams({ sort: "trending" });
    } else if (value === "New") {
      dispatch(setFilters({ sort: "createdAt" }));
      setUrlSearchParams({ sort: "createdAt" });
    }
  };

  const handleChangeSubSort = (value: string) => {
    setSubsort(value);
    dispatch(setFilters({ sort: value }));
    setUrlSearchParams({ sort: value });
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
    const [selected, setSelected] = useState<string | undefined>(undefined);

    const handleClick = (value: string) => () => {
      const key = () => {
        if (name === "DEX") {
          return "dex";
        } else if (name === "Age") {
          return "age";
        } else if (name === "Min progress") {
          return "minProgress";
        } else if (name === "Max progress") {
          return "maxProgress";
        }
        return name.toLowerCase();
      };
      setSelected(value);
      dispatch(setFilters({ [key()]: value === "Any" ? undefined : value }));
      setUrlSearchParams({ [key()]: value === "Any" ? undefined : value });
    };
    return (
      <CustomPopover
        trigger={
          <button className="border-borderColor border rounded-md px-3 flex gap-2 items-center whitespace-nowrap">
            <IconFilterFilled size={16} />
            {name} {selected && selected !== "Any" ? `(${selected})` : ""}
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
                onClick={handleClick(item)}
                selected={selected === item}
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

  const handleBoosted = () => {
    setBoosted(!boosted);
    dispatch(setFilters({ boosted: boosted ? undefined : "true" }));
    setUrlSearchParams({ boosted: boosted ? undefined : "true" });
  };

  const handleAds = () => {
    setAds(!ads);
    dispatch(setFilters({ ads: ads ? undefined : "true" }));
    setUrlSearchParams({ ads: ads ? undefined : "true" });
  };

  return (
    <ScrollOnDrag className="flex pb-4 pt-1 cursor-move">
      <div className="flex p-[1px] bg-lighterColor rounded-md">
        <div
          className={clsx(
            "rounded-l-lg cursor-pointer whitespace-nowrap px-3 text-sm py-2 bg-bgColor hover:bg-lighterColor",
            chainId === undefined && "bg-lighterColor"
          )}
          onClick={handleChangeChain(undefined)}
        >
          All chains
        </div>
        {supportedChains.map((chain) => (
          <div
            key={chain.id}
            className={clsx(
              "cursor-pointer px-3 py-2 bg-bgColor whitespace-nowrap text-sm hover:bg-lighterColor",
              chainId === chain.id.toString() && "bg-lighterColor"
            )}
            onClick={handleChangeChain(chain.id.toString())}
          >
            {chain.name}
          </div>
        ))}
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
            { label: "5M", value: "_5M" },
            { label: "1H", value: "_1H" },
            { label: "6H", value: "_6H" },
            { label: "24H", value: "_24H" },
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
          <CustomButton
            className={clsx("rounded-r-none", boosted && "bg-lightColor")}
            onClick={handleBoosted}
          >
            <BoltIcon />
            <span
              className={clsx(
                "-ml-2 hidden md:block",
                boosted ? "text-orangeColor" : "text-white"
              )}
            >
              Boosted
            </span>
            <IconCheck size={16} color={boosted ? "orange" : "white"} />
          </CustomButton>
          <CustomButton
            className={clsx("rounded-l-none", ads && "bg-lightColor")}
            onClick={handleAds}
          >
            <AdIcon fill="#00D26C" />
            <span
              className={clsx(
                "hidden md:block",
                ads ? "text-greenColor" : "text-white"
              )}
            >
              Ads
            </span>
            <IconCheck size={16} color={ads ? "green" : "white"} />
          </CustomButton>
        </div>
      </div>
    </ScrollOnDrag>
  );
};

export default DragScrollbar;
