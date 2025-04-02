import Duration from "duration";
import { contractConfig } from "./config/contractConfig";
import { getBytes, solidityPackedKeccak256, toUtf8Bytes, Wallet } from "ethers";
import { useState } from "react";
import { useEffect } from "react";
import { TransactionType } from "@/interfaces/types";
import queryString from "query-string";
import { getHttpsPriceUrl, getPriceKey } from "./config/chainDexConfig";
import axios from "axios";
import { isEmpty, isValidEmail } from "./validation";

// get Signature when create a new token
export async function generateSignature(
  name: string,
  symbol: string,
  nonce: number,
  factory: string,
  chainId: number,
  msgSender: string,
  privateKey: string
) {
  // 1. Create the packed message hash (matching Solidity keccak256)
  const messageHash = solidityPackedKeccak256(
    ["string", "string", "uint256", "address", "uint256", "address"],
    [name, symbol, nonce, factory, chainId, msgSender]
  );
  console.log("Message Hash:", messageHash);

  // 2. Convert the hash to bytes
  const messageHashBytes = getBytes(messageHash);

  // 3. Create the Ethereum signed message prefix
  const prefix = toUtf8Bytes("\x19Ethereum Signed Message:\n32");

  // 4. Concatenate prefix and message hash
  const prefixedMessage = new Uint8Array(
    prefix.length + messageHashBytes.length
  );
  prefixedMessage.set(prefix);
  prefixedMessage.set(messageHashBytes, prefix.length);

  // 5. Create the final hash that matches toEthSignedMessageHash
  const finalHash = solidityPackedKeccak256(["bytes"], [prefixedMessage]);
  console.log("Final Hash (matching toEthSignedMessageHash):", finalHash);

  // 6. Sign the message
  const signer = new Wallet(privateKey);
  const signature = await signer.signMessage(messageHashBytes);
  console.log("Signature:", signature);

  return {
    messageHash,
    finalHash,
    signature,
  };
}

//go to other site
export const linkOtherSite = (url: string) => {
  window.location.href = url;
};

//get step color
export const getStepColor = (step: string) => {
  if (step === "Live") return "bg-greenColor";
  else if (step === "Upcoming") return "bg-orange-500";
  else return "bg-purple-500";
};

//get duration
export const getDuration = (date1: Date, date2: Date = new Date()) => {
  return new Duration(new Date(date1), date2);
};

//get duration from certain date to now
export const getCreatedBefore = (createdAt: Date) => {
  const getDuration = (createdAt: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

    return {
      years: Math.floor(diff / (3600 * 24 * 365)),
      months: Math.floor(diff / (3600 * 24 * 30)),
      days: Math.floor(diff / (3600 * 24)),
      hours: Math.floor(diff / 3600),
      minutes: Math.floor(diff / 60),
      seconds: diff,
    };
  };

  const duration = getDuration(createdAt);
  const obj = {
    years: duration.years,
    months: duration.months,
    days: duration.days,
    hours: duration.hours,
    minutes: duration.minutes,
    seconds: duration.seconds,
  };

  for (const key of Object.keys(obj)) {
    const value = obj[key as keyof typeof obj];
    if (value > 0) {
      return `${value} ${key[0]}`;
    }
  }
  return "Just now";
};

export const useTimeAgo = (createdAt: Date) => {
  const [timeAgo, setTimeAgo] = useState(getCreatedBefore(createdAt));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(getCreatedBefore(createdAt));
    }, 1000);

    return () => clearInterval(interval);
  }, [createdAt]);

  return timeAgo;
};

//number format with 1 decimal place
export const numberFormat = (num: number) => {
  if (num < 1000) return num.toString();
  const units = ["K", "M", "B", "T"];
  let unitIndex = 0;
  let formattedNum = num;

  while (formattedNum >= 1000 && unitIndex < units.length) {
    formattedNum /= 1000;
    unitIndex++;
  }

  return `${formattedNum.toFixed(1)}${units[unitIndex - 1]}`;
};

//get contract address by chainId
export const getContractAddress = (chainId: number): `0x${string}` => {
  const address =
    contractConfig[chainId.toString() as keyof typeof contractConfig]?.factory
      .address;
  // Remove any whitespace and ensure 0x prefix
  return address?.trim().toLowerCase() as `0x${string}`;
};

//get image name by image type and nonce when upload image
export const generateImageName = ({
  imageType,
  nonce,
}: {
  imageType: string;
  nonce: string;
}): string => {
  return `hydrapad_${imageType}_${nonce}`.toLowerCase().replace(/\s+/g, "_");
};

//get pin group name when upload metadata to pinata
export const generatePinGroupName = ({
  address,
}: {
  address: string;
}): string => {
  return `${address}`;
};

//-----------------Slippage Buy Token-----------------
export const getMinTokenAmount = (tokenAmount: number, slippage: number) => {
  return (tokenAmount * (100 - slippage)) / 100;
};
export const getMaxEthAmount = (ethAmount: number, slippage: number) => {
  return (ethAmount * (100 + slippage)) / 100;
};

//-----------------Slippage Sell Token-----------------
export const getMinEthAmount = (ethAmount: number, slippage: number) => {
  return (ethAmount * (100 - slippage)) / 100;
};
export const getMaxTokenAmount = (tokenAmount: number, slippage: number) => {
  return (tokenAmount * (100 + slippage)) / 100;
};

//get price nubmer
// export const getNumber = (value: bigint) => {
//   return parseFloat(formatUnits(value, 18));
// };

//aggregate transactions to candles
export const aggregateTransactionsToCandles = (
  transactions: TransactionType[],
  intervalInSeconds = 60
) => {
  const aggregatedData: {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }[] = [];

  transactions.forEach((transaction) => {
    const timestamp =
      new Date(transaction.createdAt || new Date()).getTime() / 1000;
    const minuteBucket =
      Math.floor(timestamp / intervalInSeconds) * intervalInSeconds;

    // Find the candle for the given minuteBucket
    let candle = aggregatedData.find((item) => item.time === minuteBucket);

    if (!candle) {
      // If no candle exists for this minute, create a new one
      candle = {
        time: minuteBucket,
        open: transaction.price,
        high: transaction.price,
        low: transaction.price,
        close: transaction.price,
        volume: transaction.token, // Assuming token as the volume
      };
      aggregatedData.push(candle);
    } else {
      // Update the existing candle data
      candle.high = Math.max(candle.high, transaction.price);
      candle.low = Math.min(candle.low, transaction.price);
      candle.close = transaction.price; // Latest transaction price is the close
      candle.volume += transaction.token; // Add to the total volume for the minute
    }
  });

  return aggregatedData;
};

export const setUrlSearchParams = (
  params: Record<string, string | undefined>
) => {
  const url = new URL(window.location.href);
  const searchParams = queryString.parse(url.search);
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) {
      delete searchParams[key];
    } else {
      searchParams[key] = value;
    }
  });
  url.search = queryString.stringify(searchParams);
  window.history.pushState({}, "", url.toString());
};

export const getUrlSearchParams = () => {
  const url = new URL(window.location.href);
  return queryString.parse(url.search);
};

export const getCurrentEthPrice = async (chainId: number) => {
  const priceUrl = getHttpsPriceUrl(chainId);
  if (!priceUrl) return 0;
  const response = await axios.get(priceUrl);
  const priceKey = getPriceKey(chainId);
  return response.data[priceKey as keyof typeof response.data].usd;
};

export const isFormValid = (obj: Record<string | number, unknown>) => {
  let isValid = true;
  Object.keys(obj).forEach((key: string) => {
    if (isEmpty(obj[key])) {
      isValid = false;
    }
    if (key === "email" && !isValidEmail(obj[key] as string)) {
      isValid = false;
    }
  });
  return isValid;
};