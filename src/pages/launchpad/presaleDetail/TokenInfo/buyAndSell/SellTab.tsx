import {
  IconAdjustmentsHorizontal,
  IconTransfer,
  IconWallet,
} from "@tabler/icons-react";

import InfoText from "@/components/common/InfoText";
import { getChainName, getUnit } from "@/utils/config/chainDexConfig";
import { isEmpty } from "@/utils/validation";
import { Button, Input } from "@material-tailwind/react";
import { IconShieldHalfFilled } from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import { useAccount } from "wagmi";
import { getMaxTokenAmount } from "@/utils/func";
import { getMinPriceAmount } from "@/utils/func";
import { useEffect, useState } from "react";
import { useCurrentPrice, useSellToken } from "@/utils/contractUtils";
import { toast } from "react-toastify";
import { parseUnits } from "viem";
import { useAppSelector } from "@/store/hooks";
import IconText from "@/components/common/IconText";
import { useWeb3Modal } from "@web3modal/wagmi/react";
const SellTab: React.FC<{
  openFeeDialog: () => void;
  balance: number;
  tokenBalance: number;
}> = ({ openFeeDialog, tokenBalance }) => {
  const { chainId, tokenAddress } = useParams();
  const { token } = useAppSelector((state) => state.token);
  const [slippage, setSlippage] = useState<number>(5);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const { price: currentPrice } = useCurrentPrice(
    tokenAddress as `0x${string}`
  );
  const { sellGivenIn, sellGivenOut } = useSellToken(
    tokenAddress as `0x${string}`
  );
  const [value, setValue] = useState<number>(0);
  const [tokenAmount, setTokenAmount] = useState<number>(0);
  const [swapped, setSwapped] = useState<boolean>(false);
  const [minAmountPrice, setMinAmountPrice] = useState<number>(0);
  const [maxAmountToken, setMaxAmountToken] = useState<number>(0);
  const [transactionLoading, setTransactionLoading] = useState<boolean>(false);
  useEffect(() => {
    setMinAmountPrice(getMinPriceAmount(tokenAmount * currentPrice, slippage));
    setMaxAmountToken(getMaxTokenAmount(value / currentPrice, slippage));
  }, [tokenAmount, value, slippage, currentPrice]);

  useEffect(() => {
    setValue(tokenAmount * currentPrice);
  }, [tokenAmount, currentPrice]);

  const handleSwap = (swapped: boolean) => () => {
    if (!swapped) {
      setTokenAmount(value / currentPrice);
    } else {
      setValue(tokenAmount * currentPrice);
    }
    setSwapped(swapped);
  };

  const handleAction = async () => {
    if (isEmpty(value) || isEmpty(tokenAmount)) {
      toast.error("Missing required infomation");
      return;
    }
    setTransactionLoading(true);
    if (!swapped) {
      const expectedPrice = tokenAmount * currentPrice;
      const minAmountPrice = getMinPriceAmount(expectedPrice, slippage);
      setMinAmountPrice(minAmountPrice);
      try {
        await sellGivenIn(
          parseUnits(tokenAmount.toString(), 18),
          parseUnits(minAmountPrice.toString(), 18)
        );
      } catch (error) {
        toast.error("Error occurred while selling token!");
      } finally {
        setTransactionLoading(false);
      }
    } else {
      if (isEmpty(tokenAmount) || isEmpty(value)) {
        toast.error("Missing required infomation");
        return;
      }
      const expectedTokenAmount = value / currentPrice;
      const maxAmountToken = getMaxTokenAmount(expectedTokenAmount, slippage);
      setMaxAmountToken(maxAmountToken);
      try {
        await sellGivenOut(
          parseUnits(maxAmountToken.toString(), 18),
          parseUnits(value.toString(), 18)
        );
      } catch (error) {
        toast.error("Error occurred while selling token!");
      } finally {
        setTransactionLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!swapped) {
      if (tokenBalance < tokenAmount) {
        setErrorMessage("Insufficient token balance");
      } else {
        setErrorMessage("");
      }
    } else {
      if (tokenBalance < maxAmountToken) {
        setErrorMessage("Insufficient token balance");
      } else {
        setErrorMessage("");
      }
    }
  }, [tokenBalance, tokenAmount, swapped, maxAmountToken]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val >= 0) {
      if (val >= 1 && e.target.value.startsWith("0")) {
        e.target.value = e.target.value.slice(1);
      }
      const { name } = e.target;
      if (name === "value") {
        setValue(val);
      } else {
        setTokenAmount(val);
      }
    } else {
      setValue(0);
      setTokenAmount(0);
    }
  };

  const handleConnectWallet = () => {
    open();
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="border border-borderColor rounded-md">
        <div className="relative">
          <div className="flex gap-2 w-[100px] absolute left-2 top-1/2 z-[999] -translate-y-1/2">
            <img
              src={
                !swapped
                  ? token.logo
                  : `/assets/images/chains/${getChainName(Number(chainId))}.png`
              }
              alt="polygon-icon"
              className="w-6 h-6"
            />
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
              {!swapped ? token.symbol : getUnit(Number(chainId))}
            </span>
          </div>
          {!swapped ? (
            <Input
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              name="tokenAmount"
              type="number"
              value={tokenAmount}
              onChange={handleChange}
              icon={
                <button
                  className="bg-gray-800 p-1 rounded-md overflow-hidden"
                  onClick={handleSwap(true)}
                >
                  <IconTransfer size={12} />
                </button>
              }
              crossOrigin={"false"}
              labelProps={{ className: "content-none" }}
              className="placeholder:opacity-50 text-white border-none mb-3 pl-[100px] text-xl appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          ) : (
            <Input
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              name="value"
              type="number"
              value={value}
              onChange={handleChange}
              icon={
                <button
                  className="bg-gray-800 p-1 rounded-md overflow-hidden"
                  onClick={handleSwap(false)}
                >
                  <IconTransfer size={12} />
                </button>
              }
              crossOrigin={"false"}
              labelProps={{ className: "content-none" }}
              className="placeholder:opacity-50 text-white border-none mb-3 pl-[100px] text-xl appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          )}
        </div>
        <div className="flex gap-[1px]">
          {[10, 20, 25, 50, 75, 100].map((item) => (
            <button
              key={item}
              onClick={() => setValue(item)}
              className="text-[12px] py-1 bg-lighterColor w-1/6 hover:bg-lightestColor transition"
            >
              {item}%
            </button>
          ))}
        </div>
      </div>

      <div className="border border-borderColor rounded-md overflow-hidden">
        <div className="flex gap-4 items-center px-2 py-1">
          <span className="text-sm text-textDark whitespace-nowrap">
            Slippage %
          </span>
          <Input
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            type="number"
            value={slippage}
            onChange={(e) => setSlippage(Number(e.target.value))}
            crossOrigin={"false"}
            labelProps={{ className: "content-none" }}
            className="placeholder:opacity-50 text-gray-500 text-xl border-none mb-3 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>
        <div className="flex gap-[1px]">
          {[5, 10, 15, 20, 25, 30].map((item) => (
            <button
              key={item}
              onClick={() => setSlippage(item)}
              className="text-[12px] py-1 bg-lighterColor w-1/6 hover:bg-lightestColor transition"
            >
              {item}%
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          disabled={transactionLoading}
          onClick={isConnected ? handleAction : handleConnectWallet}
          color="red"
          className="w-full py-2 flex justify-center"
        >
          {transactionLoading ? (
            <div className="flex items-center gap-2">
              <div className="dot-flashing m-auto"></div>
            </div>
          ) : (
            <>
              {isConnected ? (
                "SELL"
              ) : (
                <IconText>
                  <IconWallet size={16} color="white" />
                  <span className="text-white">Connect Wallet</span>
                </IconText>
              )}
            </>
          )}
        </Button>
        <Button
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="px-3 py-2"
          onClick={openFeeDialog}
        >
          <IconAdjustmentsHorizontal size={16} />
        </Button>
      </div>
      {!isEmpty(errorMessage) ? (
        <span className="text-red-500 text-center">{errorMessage}</span>
      ) : (
        <>
          <InfoText className="text-center">
            {!swapped ? (
              <>
                you receive min. {minAmountPrice} {getUnit(Number(chainId))}{" "}
                (~$0)
              </>
            ) : (
              <>
                you spend max. {maxAmountToken} {token.symbol} (~$0)
              </>
            )}
          </InfoText>
          <div className="flex gap-1 items-center justify-center">
            <span className="text-[11px] text-textDark">
              Priority fee: 0 {getUnit(Number(chainId))}
            </span>
            <IconShieldHalfFilled size={16} color="grey" />
          </div>
        </>
      )}
    </div>
  );
};
export default SellTab;
