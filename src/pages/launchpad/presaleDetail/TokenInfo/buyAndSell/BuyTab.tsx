import IconText from "@/components/common/IconText";
import InfoText from "@/components/common/InfoText";
import { getChainName, getUnit } from "@/utils/config/chainDexConfig";
import {
  useAmountInAndFee,
  useBuyToken,
  useCurrentTokenPrice,
  useAmountOutAndFee,
  useMigrate,
} from "@/utils/contractUtils";
import { isEmpty } from "@/utils/validation";
import { Button, Input } from "@material-tailwind/react";
import {
  IconShieldHalfFilled,
  IconTransfer,
  IconWallet,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { parseUnits } from "viem";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getMinTokenAmount } from "@/utils/func";
import { getMaxEthAmount } from "@/utils/func";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { saveTransactionAction } from "@/store/actions/token.action";
import FormatPrice from "@/components/ui/FormatPrice";
import { toastSuccess, toastError } from "@/utils/customToast";

const BuyTab: React.FC<{
  openFeeDialog: () => void;
  balance: number | undefined;
  tokenBalance: number;
}> = ({ balance }) => {
  const { isConnected, address } = useAccount();
  const { tokenAddress, chainId } = useParams();
  const currentChainId = useChainId();
  const { switchChain, isPending: isSwitchPending } = useSwitchChain();
  const { open } = useWeb3Modal();
  const [value, setValue] = useState<number>(0.1);
  const [tokenAmount, setTokenAmount] = useState<number>(0);
  const [swapped, setSwapped] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [slippage, setSlippage] = useState<number>(10);
  const [minTokenAmount, setMinTokenAmount] = useState<number>(0);
  const [maxEthAmount, setMaxEthAmount] = useState<number>(0);
  const [priorityFee, setPriorityFee] = useState<number>(0);
  const [transactionLoading, setTransactionLoading] = useState<boolean>(false);
  const { token } = useAppSelector((state) => state.token);
  const dispatch = useAppDispatch();

  const { buyGivenIn, buyGivenOut } = useBuyToken(
    Number(chainId),
    tokenAddress as `0x${string}`
  );
  const { currentPrice, accumulatedPOL, remainingTokens } =
    useCurrentTokenPrice(tokenAddress as `0x${string}`, Number(chainId));
  const { ethPrice } = useAppSelector((state) => state.eth);

  const { amountOut, amountOutFee, refetchAmountOut } = useAmountOutAndFee(
    Number(chainId),
    tokenAddress as `0x${string}`,
    parseUnits(value.toString(), 18),
    parseUnits(accumulatedPOL?.toString() || "0", 18),
    parseUnits(remainingTokens?.toString() || "0", 18),
    true
  );
  const { amountIn, amountInfee, refetchAmountIn } = useAmountInAndFee(
    Number(chainId),
    tokenAddress as `0x${string}`,
    parseUnits(tokenAmount.toString(), 18),
    parseUnits(accumulatedPOL?.toString() || "0", 18),
    parseUnits(remainingTokens?.toString() || "0", 18),
    true
  );
  const { canMigrate, migrateToken } = useMigrate(
    Number(chainId),
    tokenAddress as `0x${string}`
  );

  useEffect(() => {
      setTransactionLoading(isSwitchPending);
    }, [isSwitchPending]);

  useEffect(() => {
    if (!swapped) {
      if (amountOut !== 0) {
        setMinTokenAmount(getMinTokenAmount(amountOut, slippage));
        setPriorityFee(amountOutFee);
      }
    } else {
      if (amountIn !== 0) {
        setMaxEthAmount(getMaxEthAmount(amountIn, slippage));
        setPriorityFee(amountInfee);
      }
    }
  }, [slippage, amountOut, amountIn, swapped, amountInfee, amountOutFee]);

  useEffect(() => {
    const migrate = async () => {
      if (canMigrate) {
        console.log("Token can be migrated!");
        try {
          await migrateToken();
          toastSuccess("Token is migrated successfully!");
        } catch (error) {
          toastError("Migration is failed!");
          console.error(error);
        }
      }
    };
    migrate();
  }, [token?.marketCap]);

  // useEffect(() => {
  //   if (!swapped) {
  //     const newValue = tokenAmount * (currentPrice || 0);
  //     setValue(isFinite(newValue) ? newValue : 0);
  //   }
  // }, [tokenAmount, currentPrice, swapped]);

  const handleSwap = (swapped: boolean) => () => {
    if (!swapped) {
      const newValue = tokenAmount * (currentPrice || 0);
      setValue(isFinite(newValue) ? newValue : 0);
    } else {
      const newTokenAmount = currentPrice ? value / currentPrice : 0;
      setTokenAmount(isFinite(newTokenAmount) ? newTokenAmount : 0);
    }
    setSwapped(swapped);
  };

  const handleAction = async () => {
    setTransactionLoading(true);
    if (currentChainId.toString() !== chainId?.toString()) {
      return switchChain({ chainId: Number(chainId) });
    }
    if (!swapped) {
      if (isEmpty(value)) {
        toastError("Missing required infomation");
      } else {
        try {
          setTransactionLoading(true);
          const txHash = await buyGivenIn(
            parseUnits(minTokenAmount.toString(), 18),
            parseUnits(value.toString(), 18),
            parseUnits(amountOutFee.toString(), 18)
          );
          if (token && txHash) {
            toastSuccess("Token purchased successfully!");

            dispatch(
              saveTransactionAction({
                txHash,
                symbol:
                  token.dex?.name +
                  ":" +
                  token.symbol +
                  "/" +
                  getUnit(Number(chainId)),
                type: "Buy",
                tokenAddress: tokenAddress as `0x${string}`,
                token: minTokenAmount,
                eth: value,
                maker: address as `0x${string}`,
                usd: token.price * minTokenAmount,
                price: token.price,
                chainId: Number(chainId),
              })
            );
          }
        } catch (error) {
          toastError("Error occurred while buying token!");
        } finally {
          setTransactionLoading(false);
        }
      }
    } else {
      if (isEmpty(tokenAmount)) {
        toastError("Missing required infomation");
      } else {
        try {
          setTransactionLoading(true);
          const txHash = await buyGivenOut(
            parseUnits(tokenAmount.toString(), 18),
            parseUnits(maxEthAmount.toString(), 18),
            parseUnits(amountInfee.toString(), 18)
          );
          if (token && txHash) {
            toastSuccess("Token purchased successfully!");
            // await addTokenToWallet({
            //   tokenAddress: tokenAddress as `0x${string}`,
            //   tokenSymbol: token.symbol,
            //   tokenImage: token.logo,
            //   tokenDecimals: token.decimals,
            // });
            // toast.success("Token is added to wallet!");
            dispatch(
              saveTransactionAction({
                txHash,
                symbol:
                  token.dex?.name +
                  ":" +
                  token.symbol +
                  "/" +
                  getUnit(Number(chainId)),
                type: "Buy",
                tokenAddress: tokenAddress as `0x${string}`,
                token: tokenAmount,
                eth: value,
                maker: address as `0x${string}`,
                usd: token.price * tokenAmount,
                price: token.price,
                chainId: Number(chainId),
              })
            );
          }
        } catch (error) {
          toastError("Error occurred while buying token!");
        } finally {
          setTransactionLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    refetchAmountIn();
    refetchAmountOut();
    if (balance !== undefined) {
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
        if (tokenAmount !== 0 && balance < maxEthAmount) {
          return setErrorMessage("Insufficient balance");
        }
        if (maxEthAmount !== 0 && maxEthAmount < 0.01) {
          return setErrorMessage(
            "Minimum buy amount is 0.01" + getUnit(Number(chainId))
          );
        }
        setErrorMessage("");
      }
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
          disabled={
            transactionLoading ||
            !isEmpty(errorMessage) ||
            (canMigrate as boolean)
          }
          onClick={isConnected ? handleAction : handleConnectWallet}
          color="green"
          className="w-full py-2 flex justify-center"
        >
          {transactionLoading ? (
            "Processing..."
          ) : (
            <>
              {isConnected ? (
                currentChainId.toString() === chainId?.toString() ? (
                  "BUY"
                ) : (
                  "Switch Network"
                )
              ) : (
                <IconText>
                  <IconWallet size={16} color="white" />
                  <span className="text-white">Connect Wallet</span>
                </IconText>
              )}
            </>
          )}
        </Button>
        {/* <Button
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="px-3 py-2"
          onClick={openFeeDialog}
        >
          <IconAdjustmentsHorizontal size={16} />
        </Button> */}
      </div>
      {!isEmpty(errorMessage) ? (
        isConnected && (
          <span className="text-red-500 text-center">{errorMessage}</span>
        )
      ) : (
        <>
          <InfoText className="text-center">
            {!swapped ? (
              <>
                you receive min. {Math.ceil(minTokenAmount)} {token.symbol} (~
                <FormatPrice
                  color="text-textDark"
                  value={
                    minTokenAmount *
                    currentPrice *
                    (ethPrice[Number(chainId)] || 0)
                  }
                />
                )
              </>
            ) : (
              <>
                you spend max. {maxEthAmount.toFixed(3)}{" "}
                {getUnit(Number(chainId))} (~
                <FormatPrice
                  color="text-textDark"
                  value={maxEthAmount * (ethPrice[Number(chainId)] || 0)}
                />
                )
              </>
            )}
          </InfoText>
          <div className="flex gap-1 items-center justify-center">
            <span className="text-[11px] text-textDark">
              Priority fee: {priorityFee.toFixed(4)}{" "}
              {!swapped ? getUnit(Number(chainId)) : token.symbol}
            </span>
            <IconShieldHalfFilled size={16} color="grey" />
          </div>
        </>
      )}
    </div>
  );
};
export default BuyTab;
