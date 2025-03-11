import IconText from "@/components/common/IconText";
import BoltIcon from "@/components/icons/BoltIcon";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeDialog, openDialog } from "@/store/reducers/dialog-slice";
import { getUnit } from "@/utils/config/chainDexConfig";
import { Button, DialogBody } from "@material-tailwind/react";
import { IconClockFilled, IconX } from "@tabler/icons-react";
import clsx from "clsx";

const TokenBoost = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.token);

  const handleClose = () => {
    dispatch(closeDialog());
  };
  const options: {
    times: number;
    hours: number;
    price: number;
    width: string;
  }[] = [
    { times: 10, hours: 12, price: 99, width: "w-1/2 lg:w-1/5" },
    { times: 30, hours: 12, price: 249, width: "w-1/2 lg:w-1/5" },
    { times: 50, hours: 12, price: 399, width: "w-1/2 lg:w-1/5" },
    { times: 100, hours: 24, price: 899, width: "w-1/2 lg:w-1/5" },
    { times: 500, hours: 24, price: 3999, width: "w-full lg:w-1/5" },
  ];
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
            <div
              className="px-8 bg-lightColor pb-4 pt-3 rounded-t-lg"
              style={{
                backgroundImage: "radial-gradient(circle,#f0b90b1f, #211E2C)",
              }}
            >
              <div className="flex justify-end -mr-4">
                <button onClick={handleClose}>
                  <IconX />
                </button>
              </div>
              <div className="flex text-[20px] lg:text-[30px] justify-center gap-3 mb-4 text-white">
                Give{" "}
                <span className="text-orangeColor whitespace-nowrap">
                  TOKEN NAME
                </span>{" "}
                a{" "}
                <span>
                  <IconText className="text-orangeColor">
                    <div className="hidden lg:block">
                      <BoltIcon width={40} />
                    </div>
                    <div className="block lg:hidden">
                      <BoltIcon width={30} />
                    </div>
                    Boost
                  </IconText>
                </span>
              </div>
              <p className="text-white mb-4 text-center">
                Showcase your support, boost Trending Score and unlock the
                Golden Ticker!
              </p>
              <div className="flex items-center gap-2">
                <hr className="w-full border-borderColor" />
                <span className="text-whit whitespace-nowrap text-white">
                  Choose a boost pack
                </span>
                <hr className="w-full border-borderColor" />
              </div>
              <div className="flex flex-wrap -mx-2">
                {options.map((item, index) => (
                  <div key={index} className={clsx("p-2", item.width)}>
                    <div className="border border-borderColor p-2 flex flex-col items-center rounded-md transition cursor-pointer hover:bg-[#18151e] bg-[#5e57771c]">
                      <div className="hidden lg:block">
                        <BoltIcon width={50} />
                      </div>
                      <div className="block lg:hidden">
                        <BoltIcon width={30} />
                      </div>

                      <span className="text-[25px] lg:text-[30px] text-white">
                        {item.times}x
                      </span>
                      <IconText>
                        <IconClockFilled size={16} />{" "}
                        <span className="text-sm">{item.hours} hours</span>
                      </IconText>
                      <span className="text-white text-[16px]">
                        ${item.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-8">
              <p className="text-orangeColor text-center text-[16px] lg:text-[20px] mb-2">
                Golden Ticker <span className="text-white">unlocks at</span> 500
                boosts
              </p>
              <div className="border-borderColor border bg-lighterColor rounded-md max-w-[400px] m-auto">
                <div className="flex justify-center gap-2 items-center py-2">
                  <div className="w-6 h-6 rounded-full bg-lightestColor"></div>
                  <span className="text-lightestColor text-[15px] lg:text-[18px]">
                    TOKEN / {getUnit(token?.chainId as number)}
                  </span>
                </div>
                <div className="flex justify-center gap-2 items-center py-2 bg-lightestColor">
                  <img
                    src={token?.logo}
                    alt="token-avatar"
                    className="w-8 h-8 rounded-md"
                  />
                  <span className="text-[19px] lg:text-[22px]">
                    <strong className="text-orangeColor">
                      {token?.symbol}
                    </strong>
                    /{getUnit(token?.chainId as number)}
                  </span>
                </div>
                <div className="flex justify-center gap-2 items-center py-2">
                  <div className="w-6 h-6 rounded-full bg-lightestColor"></div>
                  <span className="text-lightestColor text-[15px] lg:text-[18px]">
                    TOKEN / {getUnit(token?.chainId as number)}
                  </span>
                </div>
              </div>
              <p className="my-6 text-center">
                Boosts active: 100 Boosts needed: 400
              </p>
            </div>
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
            100
          </span>
        </div>
      </Button>
    </div>
  );
};

export default TokenBoost;
