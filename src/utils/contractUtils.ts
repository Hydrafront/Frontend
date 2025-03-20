import {
  useWriteContract,
  useWaitForTransactionReceipt,
  usePublicClient,
  useChainId,
  useBalance,
  useReadContract,
} from "wagmi";
import { useAccount } from "wagmi";
import { getContractAddress } from "./func";
import {
  formatUnits,
  parseUnits,
  TransactionReceipt,
  UserRejectedRequestError,
} from "viem";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { tokenAbi, factoryAbi } from "@/utils/abi";

//-----------------Create Presale Token-----------------
export const useCreatePresaleToken = () => {
  const { writeContractAsync } = useWriteContract();
  const chainId = useChainId();
  const {
    data: transactionReceipt,
    isLoading,
    isSuccess,
    error,
    isError,
  } = useWaitForTransactionReceipt();
  const publicClient = usePublicClient();

  const createPresaleToken = async (
    name: string,
    symbol: string,
    nonce: number,
    signature: `0x${string}`,
    initialBuy: number,
    tokenAmount: number
  ) => {
    if (!publicClient) {
      throw new Error("Public client is not available");
    }

    try {
      console.log("Initiating token creation transaction...");
      // const totalValue = initialBuy;

      // // First estimate the gas
      // const estimatedGas = await publicClient.estimateContractGas({
      //   address: process.env.NEXT_PUBLIC_BONDING_CURVE_MANAGER_ADDRESS as `0x${string}`,
      //   abi: BondingCurveManagerABI,
      //   functionName: 'create',
      //   args: [name, symbol],
      //   value: totalValue,
      //   account: address,
      // });
      let hash;
      try {
        if (initialBuy > 0) {
          hash = await writeContractAsync({
            abi: factoryAbi,
            address: getContractAddress(chainId),
            functionName: "createHydrapadPresaleTokenAndBuy",
            args: [
              name,
              symbol,
              BigInt(nonce),
              signature,
              parseUnits(tokenAmount.toString(), 18),
            ],
            value: parseUnits(initialBuy.toString(), 18),
          });
        } else {
          hash = await writeContractAsync({
            abi: factoryAbi,
            address: getContractAddress(chainId),
            functionName: "createHydrapadPresaleToken",
            args: [name, symbol, BigInt(nonce), signature],
            // value: totalValue,
          });
        }
      } catch (error) {
        console.error("DIRECT Error creating token:", error);
        throw new Error("DIRECT Error creating token:", { cause: error });
      }

      console.log("Waiting for transaction confirmation...");
      let receipt: TransactionReceipt | null = null;
      let attempts = 0;
      const maxAttempts = 30;

      while (!receipt && attempts < maxAttempts) {
        if (isSuccess && transactionReceipt) {
          receipt = transactionReceipt;
          break;
        }

        if (isError && error) {
          console.error("Transaction failed:", error?.message);
          throw new Error("Transaction failed:", { cause: error?.message });
        }

        //Manual check if the transaction is confirmed
        try {
          receipt = await publicClient.waitForTransactionReceipt({ hash });
        } catch (checkError) {
          console.error("Error checking transaction receipt:", checkError);
        }

        await new Promise((resolve) => setTimeout(resolve, 3000));
        attempts++;
        console.log(
          `Still waiting for transaction confirmation... Attempt ${attempts} of ${maxAttempts}`
        );

        if (!receipt) {
          console.error("Transaction confirmation timed out");
          throw new Error("Transaction confirmation timed out");
        }
        console.log("Transaction confirmed. Receipt:", receipt);
      }

      if (error instanceof UserRejectedRequestError) {
        console.error("Transaction rejected by user");
        throw new Error("Transaction rejected by user");
      }
      return receipt;
    } catch (error) {
      throw new Error("Error creating token:", { cause: error });
    }
  };
  return {
    createPresaleToken,
    isLoading,
    UserRejectedRequestError,
  };
};

//-----------------User Balance-----------------
export const useUserBalance = (
  address: `0x${string}`,
  tokenAddress: `0x${string}`
) => {
  const { data: balance, refetch: refetchBalance } = useBalance({
    address: address as `0x${string}`,
  });
  const { data: tokenBalance, refetch: refetchTokenBalance } = useBalance({
    address: address as `0x${string}`,
    token: tokenAddress as `0x${string}`,
  });
  const refetch = useCallback(() => {
    refetchBalance();
    refetchTokenBalance();
  }, [refetchBalance, refetchTokenBalance]);

  return {
    balance: balance?.value,
    tokenBalance: tokenBalance?.value,
    refetch,
  };
};

//-----------------Buy Token-----------------

export const useBuyToken = (tokenAddress: `0x${string}`) => {
  const chainId = useChainId();
  const { writeContractAsync } = useWriteContract();
  const { address } = useAccount();
  const publicClient = usePublicClient();

  const buyGivenIn = async (minTokenAmount: bigint, amountPrice: bigint) => {
    if (!address || !tokenAddress) {
      throw new Error("Missing required information");
    }
    try {
      const txHash = await writeContractAsync({
        address: getContractAddress(chainId),
        abi: factoryAbi,
        functionName: "buyGivenIn",
        args: [tokenAddress, minTokenAmount],
        value: amountPrice,
      });
      const receipt = await publicClient?.waitForTransactionReceipt({
        hash: txHash,
      });
      if (receipt && receipt.status === "success") {
        return txHash;
      } else {
        throw new Error("Error buying token:");
      }
    } catch (error) {
      throw new Error("Error buying token:", { cause: error });
    }
  };
  const buyGivenOut = async (amountToken: bigint, maxPriceAmount: bigint) => {
    if (!address || !tokenAddress) {
      throw new Error("Missing required information");
    }
    try {
      const txHash = await writeContractAsync({
        address: getContractAddress(chainId),
        abi: factoryAbi,
        functionName: "buyGivenOut",
        args: [tokenAddress, amountToken, maxPriceAmount],
        value: maxPriceAmount,
      });
      const receipt = await publicClient?.waitForTransactionReceipt({
        hash: txHash,
      });
      if (receipt && receipt.status === "success") {
        return txHash;
      } else {
        throw new Error("Error buying token:");
      }
    } catch (error) {
      throw new Error("Error buying token:", { cause: error });
    }
  };
  return { buyGivenIn, buyGivenOut };
};

//-----------------Token Allowance-----------------
export function useTokenAllowance(
  tokenAddress: `0x${string}`,
  owner: `0x${string}`
) {
  const chainId = useChainId();
  return useReadContract({
    address: tokenAddress,
    abi: tokenAbi,
    functionName: "allowance",
    args: [owner, getContractAddress(Number(chainId))],
  }) as { data: bigint | undefined };
}

//-----------------Approve Token-----------------
export const useApproveToken = (tokenAddress: `0x${string}`) => {
  const chainId = useChainId();
  const { writeContractAsync } = useWriteContract();
  const { address } = useAccount();
  const approveToken = async (amount: bigint) => {
    if (!address || !tokenAddress) {
      throw new Error("Missing required information");
    }
    try {
      const txHash = await writeContractAsync({
        address: tokenAddress,
        abi: tokenAbi,
        functionName: "approve",
        args: [getContractAddress(Number(chainId)), amount],
      });
      return txHash;
    } catch (error) {
      throw new Error("Error approving token:");
    }
  };
  return { approveToken };
};

//-----------------Sell Token-----------------
export const useSellToken = (tokenAddress: `0x${string}`) => {
  const chainId = useChainId();
  const { writeContractAsync } = useWriteContract();
  const { address } = useAccount();
  const publicClient = usePublicClient();

  const sellGivenIn = async (
    amountToken: bigint,
    amountPOLMin: bigint,
    fee: bigint
  ) => {
    if (!address || !tokenAddress) {
      throw new Error("Missing required information");
    }
    try {
      const txHash = await writeContractAsync({
        address: getContractAddress(chainId),
        abi: factoryAbi,
        functionName: "sellGivenIn",
        args: [tokenAddress, amountToken, amountPOLMin],
        value: fee,
      });
      const receipt = await publicClient?.waitForTransactionReceipt({
        hash: txHash,
      });
      if (receipt && receipt.status === "success") {
        return txHash;
      } else {
        throw new Error("Error selling token:");
      }
    } catch (error) {
      throw new Error("Error selling token:", { cause: error });
    }
  };
  const sellGivenOut = async (amountTokenMax: bigint, amountPOL: bigint) => {
    if (!address || !tokenAddress) {
      throw new Error("Missing required information");
    }
    try {
      const txHash = await writeContractAsync({
        address: getContractAddress(chainId),
        abi: factoryAbi,
        functionName: "sellGivenOut",
        args: [tokenAddress, amountPOL, amountTokenMax],
      });
      const receipt = await publicClient?.waitForTransactionReceipt({
        hash: txHash,
      });
      if (receipt && receipt.status === "success") {
        return txHash;
      } else {
        throw new Error("Error selling token:");
      }
    } catch (error) {
      throw new Error("Error selling token:", { cause: error });
    }
  };
  return { sellGivenIn, sellGivenOut };
};

//-----------------Get Token Address from txHash-----------------
export const useGetTokenAddress = () => {
  const publicClient = usePublicClient();
  const getTokenAddress = async (
    txHash: `0x${string}`,
    type: "buy" | "sell" | "create"
  ) => {
    if (!publicClient) {
      throw new Error("Public client is not available");
    }
    try {
      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      });
      if (type === "create") {
        return receipt?.logs[0].address;
      } else if (type === "buy" || type === "sell") {
        return receipt?.to;
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error getting token address:", { cause: error });
    }
  };
  return { getTokenAddress };
};

export const addTokenToWallet = async ({
  tokenAddress,
  tokenSymbol,
  tokenImage,
  tokenDecimals = 18,
}: {
  tokenAddress: `0x${string}`;
  tokenSymbol: string;
  tokenImage: string;
  tokenDecimals: number;
}) => {
  try {
    const wasAdded = await window.ethereum?.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          image: tokenImage,
        },
      },
    });
    if (wasAdded) {
      toast.success("Token is added to wallet!");
      await window.ethereum?.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });
    } else {
      toast.error("User declined to add the token.");
    }
  } catch (error) {
    toast.error("Error occurred while adding token to wallet!");
  }
};

//-----------------Current Token Price-----------------
export function useCurrentTokenPrice(tokenAddress: `0x${string}`) {
  const { data: accumulatedPOL, refetch: refetchAccumulatedPOL } =
    useReadContract({
      address: tokenAddress,
      abi: tokenAbi,
      functionName: "getAccumulatedPOL",
    });
  const { data: remainingTokens, refetch: refetchRemainingTokens } =
    useReadContract({
      address: tokenAddress,
      abi: tokenAbi,
      functionName: "getRemainingTokens",
    });

  let currentPrice;
  if (accumulatedPOL && remainingTokens) {
    currentPrice =
      parseFloat(formatUnits(accumulatedPOL as bigint, 18)) /
      parseFloat(formatUnits(remainingTokens as bigint, 18));
  } else {
    currentPrice = 0;
  }

  const refetchCurrentPrice = useCallback(() => {
    refetchAccumulatedPOL();
    refetchRemainingTokens();
  }, [refetchAccumulatedPOL, refetchRemainingTokens]);

  return {
    accumulatedPOL,
    remainingTokens,
    currentPrice: currentPrice || 0,
    refetchRemainingTokens,
    refetchAccumulatedPOL,
    refetchCurrentPrice,
  };
}

//-----------------Current Token Market Cap-----------------
export function useMarketCap(tokenAddress: `0x${string}`) {
  const { data: currentMarketCap, refetch: refetchCurrentMarketCap } =
    useReadContract({
      address: tokenAddress,
      abi: tokenAbi,
      functionName: "getMarketCap",
    });
  const { data: minMarketCap } = useReadContract({
    address: tokenAddress,
    abi: tokenAbi,
    functionName: "getMarketCapMin",
  });
  const { data: maxMarketCap } = useReadContract({
    address: tokenAddress,
    abi: tokenAbi,
    functionName: "getMarketCapMax",
  });
  return {
    currentMarketCap:
      Number(formatUnits((currentMarketCap as bigint) || BigInt(0), 18)) || 0,
    minMarketCap:
      Number(formatUnits((minMarketCap as bigint) || BigInt(0), 18)) || 0,
    maxMarketCap:
      Number(formatUnits((maxMarketCap as bigint) || BigInt(0), 18)) || 0,
    refetchCurrentMarketCap,
  };
}

export const useFeeBPS = (tokenAddress: `0x${string}`) => {
  const { data: feeBPS } = useReadContract({
    address: tokenAddress,
    abi: tokenAbi,
    functionName: "getFeeBPS",
  });
  return { fee: Number(formatUnits((feeBPS as bigint) || BigInt(0), 2)) };
};

export const useProgressBPS = (tokenAddress: `0x${string}`) => {
  const { data: progressBPS, refetch: refetchProgressBPS } = useReadContract({
    address: tokenAddress,
    abi: tokenAbi,
    functionName: "getProgressBPS",
  });
  return {
    progressBPS: Number(formatUnits((progressBPS as bigint) || BigInt(0), 2)),
    refetchProgressBPS,
  };
};

export const useAmountOutAndFee = (
  tokenAddress: `0x${string}`,
  amountIn: bigint,
  remainingIn: bigint,
  remainingOut: bigint,
  inIsPOL: boolean
) => {
  const { data, refetch: refetchAmountOut } = useReadContract({
    address: tokenAddress,
    abi: tokenAbi,
    functionName: "getAmountOutAndFee",
    args: [amountIn, remainingIn, remainingOut, inIsPOL],
  }) as { data: [bigint, bigint] | undefined; refetch: () => void };
  return {
    amountOutFee: Number(formatUnits(data?.[1] || BigInt(0), 18)),
    amountOut: Number(formatUnits(data?.[0] || BigInt(0), 18)),
    refetchAmountOut,
  };
};

export const useAmountInAndFee = (
  tokenAddress: `0x${string}`,
  amountOut: bigint,
  remainingIn: bigint,
  remainingOut: bigint,
  inIsPOL: boolean
) => {
  const { data, refetch: refetchAmountIn } = useReadContract({
    address: tokenAddress,
    abi: tokenAbi,
    functionName: "getAmountInAndFee",
    args: [amountOut, remainingIn, remainingOut, inIsPOL],
  }) as { data: [bigint, bigint] | undefined; refetch: () => void };

  return {
    amountInfee: Number(formatUnits(data?.[1] || BigInt(0), 18)),
    amountIn: Number(formatUnits(data?.[0] || BigInt(0), 18)),
    refetchAmountIn,
  };
};

//-----------------Uniswap V2 Router-----------------
export const useUniswapV2Router = () => {
  const chainId = useChainId();
  const { data: uniswapV2Router } = useReadContract({
    address: getContractAddress(chainId),
    abi: factoryAbi,
    functionName: "getUniswapV2Router",
  });
  return { uniswapV2Router };
};

//-----------------Add Liquidity-----------------
export const useAddLiquidity = (tokenAddress: `0x${string}`) => {
  const { writeContractAsync, error: addLiquidityError } = useWriteContract();
  const { address } = useAccount();
  const addLiquidity = async (
    amountTokenDesired: bigint,
    amountTokenMin: bigint,
    amountETHMin: bigint
  ) => {
    if (!address || !tokenAddress) {
      throw new Error("Missing required information");
    }
    try {
      const txHash = await writeContractAsync({
        address: tokenAddress,
        abi: tokenAbi,
        functionName: "addLiquidity",
        args: [amountTokenDesired, amountTokenMin, amountETHMin],
      });
      return txHash;
    } catch (error) {
      throw new Error("Error adding liquidity:", { cause: error });
    }
  };
  return { addLiquidity, addLiquidityError };
};

export const useGetInitialReverses = (chainId: number) => {
  const { data: initialAccumulatedPOL } = useReadContract({
    address: getContractAddress(chainId),
    abi: factoryAbi,
    functionName: "getAccumulatedPOL",
  });
  const { data: initialRemainingTokens } = useReadContract({
    address: getContractAddress(chainId),
    abi: factoryAbi,
    functionName: "getRemainingTokens",
  });
  return { initialAccumulatedPOL, initialRemainingTokens };
};
