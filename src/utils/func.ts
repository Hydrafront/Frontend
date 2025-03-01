import Duration from "duration";
import { contractConfig } from "./config/contractConfig";
import { getBytes, solidityPackedKeccak256, toUtf8Bytes, Wallet } from "ethers";

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
  let createdBefore: string = "";
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
    const value = duration[key as keyof Duration];
    if (value > 0) {
      createdBefore = value + " " + key[0];
      break;
    }
  }
  return createdBefore;
};

//number format with 1 decimal place
export const numberFormat = (number: number) => {
  return (number / 1000).toFixed(1);
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
export const getMinTokenAmount = (amountToken: number, slippage: number) => {
  return (amountToken * (100 - slippage)) / 100;
};
export const getMaxPriceAmount = (amountPOL: number, slippage: number) => {
  return (amountPOL * (100 + slippage)) / 100;
};

//-----------------Slippage Sell Token-----------------
export const getMinPriceAmount = (amountPrice: number, slippage: number) => {
  return (amountPrice * (100 - slippage)) / 100;
};
export const getMaxTokenAmount = (amountToken: number, slippage: number) => {
  return (amountToken * (100 + slippage)) / 100;
};
