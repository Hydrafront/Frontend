import IconText from "@/components/common/IconText";
import InfoText from "@/components/common/InfoText";
import { getChainName, getUnit } from "@/utils/config/chainDexConfig";
import {
  addTokenToWallet,
  useBuyToken,
  useGetTokenAddress,
} from "@/utils/contractUtils";
import { useCurrentPrice } from "@/utils/contractUtils";
import { isEmpty } from "@/utils/validation";
import { Button, Input } from "@material-tailwind/react";
import {
  IconAdjustmentsHorizontal,
  IconShieldHalfFilled,
  IconTransfer,
  IconWallet,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { parseUnits } from "viem";
import { useAccount } from "wagmi";
import { useAppSelector } from "@/store/hooks";
import { getMinTokenAmount } from "@/utils/func";
import { getMaxPriceAmount } from "@/utils/func";
import { toast } from "react-toastify";
import { useWeb3Modal } from "@web3modal/wagmi/react";

const BuyTab: React.FC<{
  openFeeDialog: () => void;
  balance: number;
  tokenBalance: number;
}> = ({ openFeeDialog, balance }) => {
  const { isConnected } = useAccount();
  const { tokenAddress, chainId } = useParams();
  const { price: currentPrice } = useCurrentPrice(
    tokenAddress as `0x${string}`
  );
  const { getTokenAddress } = useGetTokenAddress();
  const { open } = useWeb3Modal();
  const [value, setValue] = useState<number>(0.1);
  const [tokenAmount, setTokenAmount] = useState<number>(0);
  const [swapped, setSwapped] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [slippage, setSlippage] = useState<number>(10);
  const [minTokenAmount, setMinTokenAmount] = useState<number>(0);
  const [maxPriceAmount, setMaxPriceAmount] = useState<number>(0);
  const [transactionLoading, setTransactionLoading] = useState<boolean>(false);
  const { token } = useAppSelector((state) => state.token);
  const { buyGivenIn, buyGivenOut } = useBuyToken(
    tokenAddress as `0x${string}`
  );
  // const { remainingTokens } = useCurrentPrice(tokenAddress as `0x${string}`);

  useEffect(() => {
    setMinTokenAmount(getMinTokenAmount(value / currentPrice, slippage));
    setMaxPriceAmount(getMaxPriceAmount(tokenAmount * currentPrice, slippage));
  }, [tokenAmount, value, slippage, currentPrice]);

  useEffect(() => {
    setTokenAmount(value / currentPrice);
  }, [value, currentPrice]);

  const handleAction = async () => {
    if (isEmpty(value) || isEmpty(tokenAmount)) {
      toast.error("Please enter the amount to buy.");
      return;
    }
    setTransactionLoading(true);
    if (!swapped) {
      const expectedTokenAmount = value / currentPrice;
      const minTokenAmount = getMinTokenAmount(expectedTokenAmount, slippage);
      setMinTokenAmount(minTokenAmount);
      try {
        const txHash = await buyGivenIn(
          parseUnits(minTokenAmount.toString(), 18),
          parseUnits(value.toString(), 18)
        );
        toast.success("Token purchased successfully!");
        const tokenAddress = await getTokenAddress(txHash, "buy");
        try {
          await addTokenToWallet({
            tokenAddress: tokenAddress as `0x${string}`,
            tokenSymbol: token.symbol,
            tokenImage: token.logo,
            tokenDecimals: token.decimals,
          });
        } catch (error) {
          toast.error("Error occurred while adding token to wallet!");
          console.error("Error occurred while adding token to wallet:", error);
        }
      } catch (error) {
        toast.error("Error occurred while buying token!");
      } finally {
        setTransactionLoading(false);
      }
    } else {
      const expectedPrice = tokenAmount * currentPrice;
      const maxPriceAmount = getMaxPriceAmount(expectedPrice, slippage);
      setMaxPriceAmount(maxPriceAmount);
      try {
        const txHash = await buyGivenOut(
          parseUnits(tokenAmount.toString(), 18),
          parseUnits(maxPriceAmount.toString(), 18)
        );
        const tokenAddress = await getTokenAddress(txHash, "sell");
        await addTokenToWallet({
          tokenAddress: tokenAddress as `0x${string}`,
          tokenSymbol: token.symbol,
          tokenImage: token.logo,
          tokenDecimals: token.decimals,
        });
        toast.success("Token purchased successfully!");
      } catch (error) {
        toast.error("Error occurred while buying token!");
      } finally {
        setTransactionLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!swapped) {
      if (balance < value) {
        setErrorMessage("Insufficient balance");
      } else {
        setErrorMessage("");
      }
    } else {
      if (balance < maxPriceAmount) {
        setErrorMessage("Insufficient balance");
      } else {
        setErrorMessage("");
      }
    }
  }, [balance, value, maxPriceAmount, swapped]);

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

  const handleSwap = (swapped: boolean) => () => {
    if (!swapped) {
      setValue(tokenAmount * currentPrice);
    } else {
      setTokenAmount(value / currentPrice);
    }
    setSwapped(swapped);
  };

  const handleConnectWallet = () => {
    open();
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="border overflow-hidden border-borderColor rounded-md">
        <div className="relative">
          <div className="flex items-center gap-2 w-[100px] absolute left-2 top-1/2 z-[999] -translate-y-1/2">
            <img
              src={
                swapped
                  ? token.logo
                  : `/assets/images/chains/${getChainName(Number(chainId))}.png`
              }
              alt="polygon-icon"
              className="w-5 h-5"
            />
            <span>{swapped ? token.symbol : getUnit(Number(chainId))}</span>
          </div>
          {!swapped ? (
            <Input
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              value={value}
              name="value"
              type="number"
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
              className="placeholder:opacity-50 text-white text-xl border-none mb-3 pl-[100px] appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          ) : (
            <Input
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              name="tokenAmount"
              value={tokenAmount}
              type="number"
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
              className="placeholder:opacity-50 text-white text-xl border-none mb-3 pl-[100px] appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          )}
        </div>
        <div className="flex gap-[1px]">
          {[0.1, 0.25, 0.5, 1, 2, 5].map((item) => (
            <button
              key={item}
              onClick={() => setValue(item)}
              className="text-[12px] py-1 bg-lighterColor w-1/6 hover:bg-lightestColor transition"
            >
              {item}
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
          color="green"
          className="w-full py-2 flex justify-center"
        >
          {transactionLoading ? (
            <div className="flex items-center gap-2">
              <div className="dot-flashing m-auto"></div>
            </div>
          ) : (
            <>
              {isConnected ? (
                "BUY"
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
                you receive min. {minTokenAmount} {token.symbol} (~$0)
              </>
            ) : (
              <>
                you spend max. {maxPriceAmount} {getUnit(Number(chainId))} (~$0)
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
export default BuyTab;
