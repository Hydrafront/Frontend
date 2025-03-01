import { Drawer } from "@material-tailwind/react";
import { IconArrowLeft, IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import RightSidebar from "./RightSideBar";

const RightDrawer: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="block xl:hidden">
      <button
        onClick={handleOpen}
        className="fixed right-0 top-[50%] border-2 border-green-500 z-[9999] bg-[#0000007a] hover:shadow-defaultShadow transition-all p-3 rounded-l-full"
      >
        <IconArrowLeft />
      </button>
      <Drawer
        open={open}
        placement="right"
        className="bg-bgColor"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="flex justify-start pt-2 pl-2">
          <button onClick={handleOpen} className="border border-borderColor rounded-md p-1">
            <IconX size={20} color="white" />
          </button>
        </div>
        <RightSidebar />
      </Drawer>
    </div>
  );
};

export default RightDrawer;
