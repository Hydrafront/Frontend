import IconText from "@/components/common/IconText";
import { useAppSelector } from "@/store/hooks";
import { IconCheck, IconTransferVertical } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useCurrentTokenPrice } from "@/utils/contractUtils";
import { useParams } from "react-router";
import clsx from "clsx";
const TokenSwap = () => {
  const { tokenAddress, chainId } = useParams();
  const { currentPrice } = useCurrentTokenPrice(tokenAddress as `0x${string}`, Number(chainId));
  const { ethPrice } = useAppSelector((state) => state.eth);
  const [focused, setFocused] = useState<"token" | "eth">("token");
  const [value, setValue] = useState<string>("1");
  const [ethValue, setEthValue] = useState<{ label: string; value: string }>({
    label: "USD",
    value: "0",
  });
  const { token } = useAppSelector((state) => state.token);
  const valueRef = useRef<HTMLInputElement>(null);
  const ethValueRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ethPrice[Number(chainId)]) {
    if (focused === "token") {
      if (ethValue.label === "USD") {
        setEthValue({
          ...ethValue,
          value: (
            Number(value) *
            (currentPrice * ethPrice[Number(chainId)])
          ).toString(),
        });
      } else {
        setEthValue({
          ...ethValue,
          value: (Number(value) * (currentPrice ?? 0)).toString(),
        });
        }
      }
    }
  }, [value, ethPrice[Number(chainId)], currentPrice]);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleEthValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEthValue({ ...ethValue, value: val });
    if (ethValue.label === "USD") {
      setValue(
        (Number(val) / (currentPrice * ethPrice[Number(chainId)])).toString()
      );
    } else {
      setValue((Number(val) / (currentPrice ?? 0)).toString());
    }
  };

  const handleEthSelect = (label: string) => {
    if (focused === "token") {
      setEthValue({
        label,
        value:
          label === "USD"
            ? (
                Number(value) *
                (currentPrice * ethPrice[Number(chainId)])
              ).toString()
            : (Number(value) * (currentPrice ?? 0)).toString(),
      });
      if (valueRef.current) {
        valueRef.current.focus();
      }
    } else {
      setValue(
        label === "USD"
          ? (
              Number(ethValue.value) /
              (currentPrice * ethPrice[Number(chainId)])
            ).toString()
          : (Number(ethValue.value) / (currentPrice ?? 0)).toString()
      );
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        className={clsx(
          "flex border rounded-md overflow-hidden border-borderColor"
        )}
      >
        <input
          ref={valueRef}
          value={value}
          onChange={handleValueChange}
          onFocus={() => setFocused("token")}
          className="bg-transparent p-2 pl-4 border-r w-full lg:w-auto rounded-r-none border-borderColor"
        />
        <button className="text-center px-2 flex-1 bg-lighterColor">
          {token?.symbol}
        </button>
      </div>
      <div className="flex justify-center">
        <IconTransferVertical />
      </div>
      <div
        className={clsx(
          "flex border rounded-md overflow-hidden border-borderColor"
        )}
      >
        <input
          ref={ethValueRef}
          value={ethValue.value}
          onChange={handleEthValueChange}
          onFocus={() => setFocused("eth")}
          className="bg-transparent p-2 pl-4 border-r w-full lg:w-auto rounded-r-none border-borderColor"
        />
        <div className="flex gap-2 bg-lighterColor flex-1 p-1">
          <button
            className="text-center hover:bg-lightestColor px-1 rounded-md"
            onClick={() => handleEthSelect("USD")}
          >
            <IconText>
              <IconCheck
                size={16}
                color={ethValue.label === "USD" ? "white" : "gray"}
              />
              <span
                className={clsx(
                  ethValue.label === "USD" ? "text-white" : "text-gray-500"
                )}
              >
                USD
              </span>
            </IconText>
          </button>
          <button
            className="text-center hover:bg-lightestColor px-1 rounded-md"
            onClick={() => handleEthSelect("POL")}
          >
            <IconText>
              <IconCheck
                size={16}
                color={ethValue.label === "POL" ? "white" : "gray"}
              />
              <span
                className={clsx(
                  ethValue.label === "POL" ? "text-white" : "text-gray-500"
                )}
              >
                POL
              </span>
            </IconText>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenSwap;
