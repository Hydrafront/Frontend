import IconText from "@/components/common/IconText";
import {
  IconCheck,
  IconTransferVertical,
} from "@tabler/icons-react";

const TokenSwap = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex border rounded-md border-borderColor overflow-hidden">
        <input className="bg-transparent p-2 border-r rounded-r-none border-borderColor" />
        <button className="text-center flex-1 bg-lighterColor">DINOCAT</button>
      </div>
      <div className="flex justify-center">
        <IconTransferVertical />
      </div>
      <div className="flex border rounded-md border-borderColor overflow-hidden">
        <input className="bg-transparent w-[178px] p-2 border-r rounded-r-none border-borderColor" />
        <div className="flex gap-2 bg-lighterColor flex-1 p-1">
          <button className="text-center hover:bg-lightestColor px-1 rounded-md">
            <IconText>
              <IconCheck size={16} color="green" />
              <span>USD</span>
            </IconText>
          </button>
          <button className="text-center hover:bg-lightestColor px-1 rounded-md">
            <IconText>
              <IconCheck size={16} color="green" />
              <span>POL</span>
            </IconText>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenSwap;
