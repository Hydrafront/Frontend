import { IconWallet } from "@tabler/icons-react";
import InfoText from "@/components/common/InfoText";
import { getUnit } from "@/utils/config/chainDexConfig";
import { isEmpty } from "@/utils/validation";
import { Button, Input } from "@material-tailwind/react";
import { IconShieldHalfFilled } from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import { useAccount, useSwitchChain, useChainId } from "wagmi";
import { getMinEthAmount } from "@/utils/func";
import { useEffect, useState } from "react";
import { toastSuccess, toastError } from "@/utils/customToast";
import { parseUnits } from "viem";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import IconText from "@/components/common/IconText";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { saveTransactionAction } from "@/store/actions/token.action";
import FormatPrice from "@/components/ui/FormatPrice";
import {
  useAmountInAndFee,
  useCurrentTokenPrice,
  useApproveToken,
  useTokenAllowance,
  useSellToken,
  useMigrate,
} from "@/utils/contractUtils";

const SellTab: React.FC<{
  openFeeDialog: () => void;
  balance: number | undefined;
  tokenBalance: number;
}> = ({ balance, tokenBalance }) => {
  const { chainId, tokenAddress } = useParams();
  const currentChainId = useChainId();
  const { token } = useAppSelector((state) => state.token);
  const [slippage, setSlippage] = useState<number>(5);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { isConnected, address } = useAccount();
  const { switchChain, isPending: isSwitchPending } = useSwitchChain();
  const { open } = useWeb3Modal();
  const [value, setValue] = useState<number>(0);
  const [tokenAmount, setTokenAmount] = useState<number>(0);
  const [minEthAmount, setMinEthAmount] = useState<number>(0);
  const [transactionLoading, setTransactionLoading] = useState<boolean>(false);
  const [isApproved, setIsApproved] = useState<boolean>(true);
  const [priorityFee, setPriorityFee] = useState<number>(0);
  const dispatch = useAppDispatch();
  const { ethPrice } = useAppSelector((state) => state.eth);
  const { accumulatedPOL, remainingTokens, currentPrice } =
    useCurrentTokenPrice(tokenAddress as `0x${string}`, Number(chainId));

  const { sellGivenIn } = useSellToken(
    Number(chainId),
    tokenAddress as `0x${string}`
  );
  const { amountIn, amountInfee, refetchAmountIn } = useAmountInAndFee(
    Number(chainId),
    tokenAddress as `0x${string}`,
    parseUnits(tokenAmount.toString(), token?.decimals || 18),
    parseUnits(accumulatedPOL?.toString() || "0", 18),
    parseUnits(remainingTokens?.toString() || "0", 18),
    false
  );

  useEffect(() => {
    setTransactionLoading(isSwitchPending);
  }, [isSwitchPending]);

  const { data: allowance } = useTokenAllowance(
    tokenAddress as `0x${string}`,
    address as `0x${string}`,
    chainId as string
  );
  const { approveToken } = useApproveToken(tokenAddress as `0x${string}`);
  const { canMigrate } = useMigrate(
    Number(chainId),
    tokenAddress as `0x${string}`
  );

  useEffect(() => {
    if (allowance !== undefined && address) {
      // setIsApproved(allowance > 0);
    }
  }, [allowance, address]);

  useEffect(() => {
    if (amountIn !== 0) {
      setMinEthAmount(getMinEthAmount(amountIn, slippage));
      setPriorityFee(amountInfee);
    }
  }, [slippage, amountIn, amountInfee]);

  useEffect(() => {
    const newValue = tokenAmount * (currentPrice || 0);
    setValue(isFinite(newValue) ? newValue : 0);
  }, [tokenAmount, currentPrice]);

  const handleAction = async () => {
    if (currentChainId.toString() !== chainId?.toString()) {
      return switchChain({ chainId: Number(chainId) });
    }
    if (isEmpty(tokenAmount)) {
      toastError("Missing required information");
      return;
    }
    try {
      if (!isApproved) {
        try {
          setTransactionLoading(true);
          await approveToken(
            parseUnits(tokenAmount.toString(), token?.decimals || 18)
          );
          toastSuccess("Token approved successfully!");
          setIsApproved(true);
        } catch (error) {
          toastError("Error approving token!");
        } finally {
          setTransactionLoading(false);
        }
      } else {
        try {
          setTransactionLoading(true);
          const txHash = await sellGivenIn(
            parseUnits(tokenAmount.toString(), token?.decimals || 18),
            parseUnits(minEthAmount.toString(), token?.decimals || 18),
            parseUnits(amountInfee.toString(), token?.decimals || 18)
          );
          if (token && txHash) {
            toastSuccess("Token sold successfully!");
            dispatch(
              saveTransactionAction({
                txHash,
                symbol:
                  token.dex?.name +
                  ":" +
                  token.symbol +
                  "/" +
                  getUnit(Number(chainId)),
                type: "Sell",
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
          toastError("Error occurred while selling token!");
        } finally {
          setTransactionLoading(false);
        }
      }
    } catch (error) {
      console.error(error);
      toastError("Error occurred while selling token!");
    } finally {
      setTransactionLoading(false);
    }
  };

  useEffect(() => {
    refetchAmountIn();
    if (balance !== undefined) {
      if (tokenBalance < tokenAmount) {
        return setErrorMessage("Insufficient token balance");
      }
      if (tokenAmount !== 0 && tokenAmount * currentPrice < 0.01) {
        return setErrorMessage(
          "Minimum sell amount is 0.01" + getUnit(Number(chainId))
        );
      }
      setErrorMessage("");
    }
  }, [
    tokenBalance,
    minEthAmount,
    value,
    chainId,
    balance,
    tokenAmount,
    currentPrice,
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val >= 0) {
      if (val >= 1 && e.target.value.startsWith("0")) {
        e.target.value = e.target.value.slice(1);
      }
      setTokenAmount(val);
    } else {
      setTokenAmount(0);
    }
  };

  const handleConnectWallet = () => {
    open();
  };

  const handleSelectAmount = (e: React.MouseEvent<HTMLButtonElement>) => {
    const item = Number(e.currentTarget.textContent?.slice(0, -1));
    setTokenAmount((tokenBalance * item) / 100);
  };

  if (!token) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="border border-borderColor rounded-md">
        <div className="relative">
          <div className="flex gap-2 w-[100px] absolute left-2 top-1/2 z-[999] -translate-y-1/2">
            <img src={token.logo} alt="token-icon" className="w-6 h-6" />
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
              {token.symbol}
            </span>
          </div>
          <Input
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            name="tokenAmount"
            type="number"
            value={tokenAmount}
            onChange={handleChange}
            crossOrigin={"false"}
            labelProps={{ className: "content-none" }}
            className="placeholder:opacity-50 text-white border-none mb-3 pl-[100px] text-xl appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>
        <div className="flex gap-[1px]">
          {[10, 20, 25, 50, 75, 100].map((item) => (
            <button
              key={item}
              onClick={handleSelectAmount}
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
          disabled={
            transactionLoading ||
            !isEmpty(errorMessage) ||
            (canMigrate as boolean)
          }
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
                isApproved ? (
                  currentChainId.toString() === chainId?.toString() ? (
                    "SELL"
                  ) : (
                    "Switch Network"
                  )
                ) : (
                  "APPROVE"
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
      </div>
      {!isEmpty(errorMessage) ? (
        <span className="text-red-500 text-center">{errorMessage}</span>
      ) : (
        <>
          <InfoText className="text-center">
            you receive min. {minEthAmount.toFixed(3)}{" "}
            {getUnit(Number(chainId))} (~
            <FormatPrice
              color="text-textDark"
              value={minEthAmount * (ethPrice[Number(chainId)] || 0)}
            />
            )
          </InfoText>
          <div className="flex gap-1 items-center justify-center">
            <span className="text-[11px] text-textDark">
              Priority fee: {priorityFee.toFixed(4)} {getUnit(Number(chainId))}
            </span>
            <IconShieldHalfFilled size={16} color="grey" />
          </div>
        </>
      )}
    </div>
  );
};

export default SellTab;
