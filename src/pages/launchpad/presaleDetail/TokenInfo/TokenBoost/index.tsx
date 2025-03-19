import BoltIcon from "@/components/icons/BoltIcon";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openDialog } from "@/store/reducers/dialog-slice";
import { Button, DialogBody } from "@material-tailwind/react";
import BoostDashboard from "./BoostDashboard";

const TokenBoost = () => {
    const dispatch = useAppDispatch();
    const { token } = useAppSelector((state) => state.token);

  const handleClick = () => {
    dispatch(
      openDialog({
        children: (
          <DialogBody
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            className="p-0"
          >
            <BoostDashboard />
          </DialogBody>
        ),
        size: "md",
      })
    );
  };
  return (
    <div>
      <Button
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        className="hover:bg-[#f0bb0b31] bg-[#f0b90b0a] py-2 border w-full flex justify-center rounded-md items-center border-[#f0b90b5c]"
        onClick={handleClick}
      >
        <BoltIcon />
        <span>Boost</span>
        <div>
          <span className="px-[10px] py-[1px] ml-2 rounded-lg text-sm text-black bg-orange-500">
            {token?.boost}
          </span>
        </div>
      </Button>
    </div>
  );
};

export default TokenBoost;
