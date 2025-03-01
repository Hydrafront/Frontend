import CustomPopover from "@/components/common/CustomPopover";
import FilterHeader from "./FilterHeader";
import { List, ListItem } from "@material-tailwind/react";

const HeaderType = () => {
  return (
    <div>
      <CustomPopover
        trigger={
          <button className="w-full">
            <FilterHeader
              title="TYPE"
              className="min-w-32 cursor-pointer justify-center"
            />
          </button>
        }
      >
        <List
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="p-0 min-w-[100px]"
        >
          {[
            "All",
            "Buy/Sell",
            "Buy",
            "Sell",
            "Add/Remove",
            "Add",
            "Remove",
          ].map((item, index) => (
            <ListItem
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className="text-[14px] px-6 rounded-none py-1"
              key={index}
            >
              {item}
            </ListItem>
          ))}
        </List>
      </CustomPopover>
    </div>
  );
};

export default HeaderType;
