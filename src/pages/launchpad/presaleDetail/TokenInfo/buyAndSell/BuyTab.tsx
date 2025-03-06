import IconText from "@/components/common/IconText";
import InfoText from "@/components/common/InfoText";
import { getChainName, getUnit } from "@/utils/config/chainDexConfig";
import { addTokenToWallet, useBuyToken } from "@/utils/contractUtils";
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
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getMinTokenAmount } from "@/utils/func";
import { getMaxEthAmount } from "@/utils/func";
import { toast } from "react-toastify";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useCurrentTokenPrice } from "@/utils/contractUtils";
import { saveTransactionAction } from "@/store/actions/token.action";
import { useFeeBPS } from "@/utils/contractUtils";
import FormatPrice from "@/components/ui/FormatPrice";

const BuyTab: React.FC<{
  openFeeDialog: () => void;
  balance: number;
  tokenBalance: number;
}> = ({ openFeeDialog, balance }) => {
  const { isConnected, address } = useAccount();
  const { tokenAddress, chainId } = useParams();
  const { open } = useWeb3Modal();
  const [value, setValue] = useState<number>(0.1);
  const [tokenAmount, setTokenAmount] = useState<number>(0);
  const [swapped, setSwapped] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [slippage, setSlippage] = useState<number>(10);
  const [minTokenAmount, setMinTokenAmount] = useState<number>(0);
  const [maxEthAmount, setMaxEthAmount] = useState<number>(0);
  const [transactionLoading, setTransactionLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { buyGivenIn, buyGivenOut } = useBuyToken(
    tokenAddress as `0x${string}`
  );
  const { token } = useAppSelector((state) => state.token);
  const { currentPrice } = useCurrentTokenPrice(tokenAddress as `0x${string}`);
  const { fee } = useFeeBPS(tokenAddress as `0x${string}`);
  const { ethPrice } = useAppSelector((state) => state.eth);
  const currentEthPrice = ethPrice[Number(chainId)];

  useEffect(() => {
    setMinTokenAmount(getMinTokenAmount(value / currentPrice, slippage));
    setMaxEthAmount(getMaxEthAmount(tokenAmount * currentPrice, slippage));
  }, [tokenAmount, value, slippage, currentPrice]);

  useEffect(() => {
    setTokenAmount(value / currentPrice);
  }, [value, currentPrice]);

  const handleAction = async () => {
    setTransactionLoading(true);
    if (!swapped) {
      if (isEmpty(value)) {
        toast.error("Missing required infomation");
      } else {
        const expectedTokenAmount = (value * (1 - fee / 100)) / currentPrice;
        const minTokenAmount = getMinTokenAmount(expectedTokenAmount, slippage);
        setMinTokenAmount(minTokenAmount);
        try {
          const txHash = await buyGivenIn(
            parseUnits(minTokenAmount.toString(), 18),
            parseUnits(value.toString(), 18)
          );
          toast.success("Token purchased successfully!");
          // const tokenAddress = await getTokenAddress(txHash, "buy");
          if (token) {
            try {
              await addTokenToWallet({
                tokenAddress: tokenAddress as `0x${string}`,
                tokenSymbol: token.symbol,
                tokenImage: token.logo,
                tokenDecimals: token.decimals,
              });
              dispatch(
                saveTransactionAction({
                  txHash,
                  type: "Buy",
                  tokenAddress: tokenAddress as `0x${string}`,
                  token: tokenAmount,
                  eth: value,
                  maker: address as `0x${string}`,
                  usd: currentPrice * tokenAmount,
                  price: currentPrice,
                  chainId: Number(chainId),
                })
              );
            } catch (error) {
              toast.error("Error occurred while adding token to wallet!");
              console.error(
                "Error occurred while adding token to wallet:",
                error
              );
            }
          }
        } catch (error) {
          toast.error("Error occurred while buying token!");
        } finally {
          setTransactionLoading(false);
        }
      }
    } else {
      if (isEmpty(tokenAmount)) {
        toast.error("Missing required infomation");
      } else {
        const expectedPrice = tokenAmount * currentPrice;
        const maxEthAmount = getMaxEthAmount(expectedPrice, slippage);
        setMaxEthAmount(maxEthAmount * (1 + fee / 100));
        try {
          const txHash = await buyGivenOut(
            parseUnits(tokenAmount.toString(), 18),
            parseUnits((maxEthAmount * (1 + fee / 100)).toString(), 18)
          );
          toast.success("Token purchased successfully!");
          if (token) {
            await addTokenToWallet({
              tokenAddress: tokenAddress as `0x${string}`,
              tokenSymbol: token.symbol,
              tokenImage: token.logo,
              tokenDecimals: token.decimals,
            });
            toast.success("Token is added to wallet!");
            dispatch(
              saveTransactionAction({
                txHash,
                type: "Buy",
                tokenAddress: tokenAddress as `0x${string}`,
                token: tokenAmount,
                eth: value,
                maker: address as `0x${string}`,
                usd: currentPrice * tokenAmount,
                price: currentPrice,
                chainId: Number(chainId),
              })
            );
          }
        } catch (error) {
          toast.error("Error occurred while buying token!");
        } finally {
          setTransactionLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    if (!swapped) {
      if (balance < value) {
        return setErrorMessage("Insufficient balance");
      }
      if (value !== 0 && value < 0.01) {
        return setErrorMessage(
          "Minimum buy amount is 0.01" + getUnit(Number(chainId))
        );
      }
      setErrorMessage("");
    } else {
      if (balance < maxEthAmount) {
        return setErrorMessage("Insufficient balance");
      }
      if (maxEthAmount !== 0 && maxEthAmount < 0.01) {
        return setErrorMessage(
          "Minimum buy amount is 0.01" + getUnit(Number(chainId))
        );
      }
      setErrorMessage("");
    }
  }, [balance, value, maxEthAmount, swapped, chainId]);

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

  if (!token) return null;

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
                you receive min. {Math.ceil(minTokenAmount)} {token.symbol} (~
                <FormatPrice
                  color="text-textDark"
                  value={minTokenAmount * currentPrice}
                />
                )
              </>
            ) : (
              <>
                you spend max. {maxEthAmount.toFixed(3)}{" "}
                {getUnit(Number(chainId))} (~
                <FormatPrice
                  color="text-textDark"
                  value={maxEthAmount * currentEthPrice}
                />
                )
              </>
            )}
          </InfoText>
          <div className="flex gap-1 items-center justify-center">
            <span className="text-[11px] text-textDark">
              Priority fee: {fee} %
            </span>
            <IconShieldHalfFilled size={16} color="grey" />
          </div>
        </>
      )}
    </div>
  );
};
export default BuyTab;
