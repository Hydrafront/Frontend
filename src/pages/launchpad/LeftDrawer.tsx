import { Drawer } from "@material-tailwind/react";
import { IconArrowRight } from "@tabler/icons-react";
import React, { useState } from "react";
import LeftSidebar, { LeftSidebarProps } from "./LeftSidebar";

const LeftDrawer: React.FC<LeftSidebarProps> = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="block lg:hidden">
      <button
        onClick={handleOpen}
        className="fixed left-0 top-[50%] border-2 border-green-500 z-[9999] bg-[#0000007a] hover:shadow-defaultShadow transition-all p-3 rounded-r-full"
      >
        <IconArrowRight />
      </button>
      <Drawer
        open={open}
        onClose={handleOpen}
        className="bg-bgColor border-r border-borderColor w-auto z-[999999]"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="flex justify-end pt-2 pr-2">
          {/* <button onClick={handleOpen} className="border border-borderColor rounded-md p-1">
            <IconX size={20} color="white" />
          </button> */}
        </div>
        <LeftSidebar handleOpen={handleOpen} />
      </Drawer>
    </div>
  );
};

export default LeftDrawer;
