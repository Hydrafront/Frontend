import { TokenType } from "@/interfaces/types";
import { StylesConfig } from "react-select";

export const multiSelectStyle: StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "rgb(33 30 44 / var(--tw-bg-opacity))",
    border: "none",
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? "#534e64"
        : isFocused
        ? "#534e64"
        : undefined,
      color: isDisabled ? "#ccc" : "white",
      cursor: isDisabled ? "not-allowed" : "pointer",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled ? "#534e64" : undefined,
      },
    };
  },
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: "#475569",
    };
  },
  multiValueLabel: (styles) => ({
    ...styles,
    color: "white",
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    // color: data.color,
    ":hover": {
      backgroundColor: "#353539",
      color: "white",
    },
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: "rgb(33 30 44 / var(--tw-bg-opacity))",
  }),
};

export const presaleData: TokenType[] = [
  {
    tokenAddress: "0x0000000000000000000000000000000000000000" as `0x${string}`,
    name: "PINGO",
    logo: "/assets/images/avatars/b.jpg",
    type: "presale",
    description:
      "$DART is tired of watching play hot potato with the endless derivative shibaCumGMElonKishuTurboAssFlokiMoon Inublablabla",
    progress: 70.4,
    symbol: "XINGE",
    chainId: 137,
    price: 6365,
    boost: 30,
    createdAt: new Date(2025, 1, 10).toISOString(),
    transaction: 2342,
    volume: 23034,
    website: "#",
    twitter: "#",
    telegram: "#",
    discord: "#",
    banner: "",
    marketCap: 0,
    decimals: 18,
  },
  {
    tokenAddress: "0x0000000000000000000000000000000000000000" as `0x${string}`,
    name: "PINGO",
    logo: "/assets/images/avatars/b.jpg",
    type: "presale",
    description:
      "$DART is tired of watching play hot potato with the endless derivative shibaCumGMElonKishuTurboAssFlokiMoon Inublablabla",
    progress: 70.4,
    symbol: "XINGE",
    chainId: 137,
    price: 6365,
    boost: 30,
    createdAt: new Date(2025, 1, 10).toISOString(),
    transaction: 2342,
    volume: 23034,
    website: "#",
    twitter: "#",
    telegram: "#",
    discord: "#",
    banner: "",
    marketCap: 0,
    decimals: 18,
  },
  {
    tokenAddress: "0x0000000000000000000000000000000000000000" as `0x${string}`,
    name: "PINGO",
    logo: "/assets/images/avatars/b.jpg",
    type: "presale",
    description:
      "$DART is tired of watching play hot potato with the endless derivative shibaCumGMElonKishuTurboAssFlokiMoon Inublablabla",
    progress: 70.4,
    symbol: "XINGE",
    chainId: 137,
    price: 6365,
    boost: 30,
    createdAt: new Date(2025, 1, 10).toISOString(),
    transaction: 2342,
    volume: 23034,
    website: "#",
    twitter: "#",
    telegram: "#",
    discord: "#",
    banner: "",
    marketCap: 0,
    decimals: 18,
  }
];

