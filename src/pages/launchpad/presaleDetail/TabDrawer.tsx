import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTab } from "@/store/reducers/token-slice";
import {
  Drawer,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  IconArrowLeft,
  IconChartBar,
  IconInfoCircleFilled,
  IconLayoutListFilled,
  IconList,
} from "@tabler/icons-react";
import clsx from "clsx";
import React, { useState } from "react";

const options: { name: string; value: string; icon: React.ReactNode }[] = [
  {
    name: "Info",
    value: "info",
    icon: <IconInfoCircleFilled />,
  },
  {
    name: "Chart-Txns",
    value: "chart-txn",
    icon: <IconLayoutListFilled />,
  },
  {
    name: "Chart",
    value: "chart",
    icon: <IconChartBar />,
  },
  {
    name: "Txns",
    value: "txn",
    icon: <IconList />,
  },
];

const TabDrawer: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { tab } = useAppSelector((state) => state.token);
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClick = (value: string) => () => {
    dispatch(setTab(value));
    handleOpen();
  };

  return (
    <div className="block lg:hidden">
      <button
        onClick={handleOpen}
        className="fixed right-0 top-[50%] border-2 border-green-500 z-[99] bg-[#0000007a] hover:shadow-defaultShadow transition-all p-3 rounded-l-full"
      >
        <IconArrowLeft />
      </button>
      <Drawer
        open={open}
        placement="right"
        onClose={handleOpen}
        className="bg-bgColor border-l border-borderColor"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {/* <div className="flex justify-start pt-2 pb-1 pl-2">
          <button
            onClick={handleOpen}
            className="border border-borderColor absolute top-2 right-2 rounded-md p-1"
          >
            <IconX size={20} color="white" />
          </button>
        </div> */}
        {/* <TokenInfo /> */}
        <List
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {options.map((item) => (
            <ListItem
              key={item.value}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              onClick={handleClick(item.value)}
              className={clsx(
                "hover:bg-lightestColor hover:text-white",
                tab === item.value && "bg-lightestColor text-white"
              )}
            >
              <ListItemPrefix
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {item.icon}
              </ListItemPrefix>
              {item.name}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default TabDrawer;
