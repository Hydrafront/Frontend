import CustomInput from "@/components/common/CustomInput";
import CustomTextarea from "@/components/common/CustomTextarea";
import GradientButton from "@/components/common/GradientButton";
import LabelText from "@/components/common/LabelText";
import {
  IconBrandDiscord,
  IconBrandTelegram,
  IconBrandX,
  IconPhotoPlus,
  IconTransfer,
  IconWallet,
  IconWorld,
  IconX,
} from "@tabler/icons-react";
import Upload from "rc-upload";
import { useAccount, useChains, useSwitchChain } from "wagmi";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Checkbox, Input } from "@material-tailwind/react";
import { useForm } from "@/hooks/useForm";
import { getDex, getUnit } from "@/utils/config/chainDexConfig";
import { toast } from "react-toastify";
import { Chain } from "viem";
import {
  BASE_URL_TOKEN,
  createTokenInfo,
  saveTransactionAction,
  uploadImageToPinata,
} from "@/store/actions/token.action";
import { getCurrentEthPrice } from "@/utils/func";
import { isEmpty } from "@/utils/validation";
import { getContractAddress } from "@/utils/func";
import { useChainId } from "wagmi";
import {
  useCreatePresaleToken,
  useProgressBPS,
  useUniswapV2Router,
  useMarketCap,
  useGetInitialReverses,
  useCurrentTokenPrice,
} from "@/utils/contractUtils";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { createTokenEmit } from "@/socket/token";
import { useAppDispatch } from "@/store/hooks";
import { toastSuccess, toastError } from "@/utils/customToast";
import axios from "axios";

const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB

export interface FormType {
  name: string;
  symbol: string;
  description: string;
  logo: string | undefined;
  banner: string | undefined;
  website: string;
  twitter: string;
  decimal?: number;
  telegram: string;
  discord: string;
  initialBuy: number;
  [key: string]: unknown; // Add index signature
}

const TokenForm: React.FC = () => {
  const { open } = useWeb3Modal();
  const chains = useChains();
  const chainId = useChainId();
  const { createPresaleToken, UserRejectedRequestError } =
    useCreatePresaleToken();
  const { isConnected, address } = useAccount();
  const [selectedChain, setSelectedChain] = useState<Chain>(chains[0]);
  const [selectedDex, setSelectedDex] = useState<
    | {
        name: string;
        address: `0x${string}` | undefined;
      }
    | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const contractAddress = getContractAddress(selectedChain.id);
  const { switchChain, isPending: isSwitchPending } = useSwitchChain();
  const { currentMarketCap } = useMarketCap(
    contractAddress as `0x${string}`,
    selectedChain.id
  );
  const { currentPrice } = useCurrentTokenPrice(
    contractAddress as `0x${string}`,
    selectedChain.id
  );
  const { progressBPS } = useProgressBPS(
    contractAddress as `0x${string}`,
    selectedChain.id
  );
  const { form, setForm, handleChange } = useForm<FormType>({
    name: "",
    symbol: "",
    description: "",
    logo: undefined,
    banner: undefined,
    website: "",
    twitter: "",
    telegram: "",
    discord: "",
    initialBuy: 0,
    policy: false,
    decimal: 18,
  });

  const { uniswapV2Router } = useUniswapV2Router(
    selectedChain.id,
    contractAddress as `0x${string}`
  );
  const dispatch = useAppDispatch();
  const { initialAccumulatedPOL, initialRemainingTokens } =
    useGetInitialReverses(selectedChain.id);

  useEffect(() => {
    setSelectedDex(
      getDex(selectedChain.id)?.[0] as {
        name: string;
        address: `0x${string}` | undefined;
      }
    );
  }, []);

  useEffect(() => {
    setIsLoading(isSwitchPending);
  }, [isSwitchPending]);

  const handleChainChange = async (value: Chain) => {
    if (!supported.includes(value.id)) {
      toast.error("This chain is not supported yet");
      return;
    }
    setSelectedChain(value);
    setSelectedDex(
      getDex(value.id)?.[0] as {
        name: string;
        address: `0x${string}` | undefined;
      }
    );
  };

  const handleImageUpload =
    (imageType: "logo" | "banner") => async (file: File) => {
      if (imageType === "logo") {
        setIsUploadingLogo(true);
      } else {
        setIsUploadingBanner(true);
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File size must be less than 5MB");
        return;
      }
      const obj: { [key: string]: string | undefined } = {};
      obj[imageType] = await uploadImageToPinata(file);
      setForm((prev: FormType) => ({
        ...prev,
        [imageType]: obj[imageType],
      }));
      if (imageType === "logo") {
        setIsUploadingLogo(false);
      } else {
        setIsUploadingBanner(false);
      }
    };

  const handleClearImage = (imageType: "logo" | "banner") => {
    setForm((prev: FormType) => ({
      ...prev,
      [imageType]: undefined,
    }));
  };

  const handleSelectDex = (dex: string) => {
    if (dex === "Uniswap") {
      setSelectedDex({
        name: "Uniswap",
        address: uniswapV2Router as `0x${string}`,
      });
    }
  };

  const getInitialPrice = async () => {
    const price = await getCurrentEthPrice(selectedChain.id);
    const initialPrice =
      (Number(initialAccumulatedPOL) / Number(initialRemainingTokens)) * price;
    return initialPrice;
  };

  const supported: number[] = [80002, 137];

  const handleCreatePresale = async () => {
    if (
      isEmpty(form.name) ||
      isEmpty(form.symbol) ||
      isEmpty(form.description) ||
      isEmpty(form.logo) ||
      isEmpty(form.banner)
    ) {
      toastError("Please fill all the fields");
      return;
    }

    if (!isEmpty(form.website) && !form.website.includes("https://")) {
      toastError("Website must not include https://");
      return;
    }
    if (!isEmpty(form.twitter) && !form.twitter.includes("https://x.com/")) {
      toastError("Twitter must not include https://x.com/");
      return;
    }
    if (!isEmpty(form.telegram) && !form.telegram.includes("https://t.me/")) {
      toastError("Telegram must not include https://t.me/");
      return;
    }
    if (
      !isEmpty(form.discord) &&
      !form.discord.includes("https://discord.gg/")
    ) {
      toastError("Discord must not include https://discord.gg/");
      return;
    }
    if (!supported.includes(selectedChain.id)) {
      toast.error("This chain is not supported yet");
      return;
    }
    setIsLoading(true);
    const tokenPrice = await getInitialPrice();

    if (chainId !== selectedChain.id) {
      return switchChain({ chainId: selectedChain.id });
    }

    try {
      const res = await axios.get(
        `${BASE_URL_TOKEN}/get-signature/${form.name}/${form.symbol}/${contractAddress}/${selectedChain.id}/${address}`
      );

      // create presale token
      let tokenAddress: `0x${string}` | undefined = undefined;
      try {
        const amountOut = (0.9 * form.initialBuy) / currentPrice;

        try {
          const receipt = await createPresaleToken(
            form.name,
            form.symbol,
            res.data.nonce,
            res.data.signature as `0x${string}`,
            form.initialBuy,
            amountOut,
            selectedChain.id
          );
          if (form.initialBuy > 0) {
            tokenAddress = receipt?.logs[1].address;
          } else {
            tokenAddress = receipt?.logs[0].address;
          }

          if (tokenAddress) {
            try {
              const { token } = await createTokenInfo(
                tokenAddress as `0x${string}`,
                {
                  type: "presale",
                  creator: address as `0x${string}`,
                  description: form.description,
                  dex: {
                    name: selectedDex?.name || "",
                    address: selectedDex?.address as `0x${string}`,
                  },
                  chainId: selectedChain.id,
                  name: form.name,
                  symbol: form.symbol,
                  progress: progressBPS,
                  logo: form.logo,
                  price: tokenPrice,
                  marketCap: currentMarketCap as number,
                  banner: form.banner,
                  website: form.website,
                  twitter: form.twitter,
                  telegram: form.telegram,
                  discord: form.discord,
                }
              );
              if (form.initialBuy > 0) {
                const transaction = {
                  txHash: receipt?.transactionHash as `0x${string}`,
                  type: "Buy",
                  tokenAddress: tokenAddress as `0x${string}`,
                  token: amountOut,
                  eth: form.initialBuy,
                  maker: address as `0x${string}`,
                  usd: amountOut * tokenPrice,
                  price: tokenPrice,
                  chainId: Number(chainId),
                  symbol: form.symbol,
                };
                dispatch(saveTransactionAction(transaction));
              }
              createTokenEmit(token);
              toastSuccess(
                "Token created successfully. Click here to view token details",
                {
                  onClick: () => {
                    window.location.href = `/detail/${
                      selectedChain.id
                    }/${tokenAddress}/${"presale"}`;
                  },
                  className: "cursor-pointer",
                }
              );
            } catch (error) {
              console.log("Error in token creation", error);
            }
          } else {
            toast.error("Transaction was reverted. Please try again");
            throw new Error("Transaction was reverted. Please try again");
          }
        } catch (error) {
          console.log("Error in token creation", error);
        }
        setIsLoading(false);
      } catch (error) {
        console.log("Error in token creation", error);

        //Reset the creation step to allow the user to try again

        if (error instanceof Error) {
          if (error instanceof UserRejectedRequestError) {
            //Metamask user rejected the transaction or similar
            toast.error("Transaction was cancelled. Please try again.");
          } else if (!tokenAddress) {
            // Error occurred before token creation on blockchain
            toast.error(
              "Failed to create token on blockchain. Please try again."
            );
          } else {
            // Token created on blockchain but backend update failed
            toast.error(
              "Token created on blockchain but failed to store token info on database. Please try storing later in your portfolio"
            );
          }
        } else {
          toast.error("An unknown error occurred");
        }
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("The token symbol is invalid!");
    }
  };

  const handleInitialBuyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val >= 0) {
      if (val >= 1 && e.target.value.startsWith("0")) {
        e.target.value = e.target.value.slice(1);
      }
      setForm((prev: FormType) => ({
        ...prev,
        initialBuy: val,
      }));
    } else {
      setForm((prev: FormType) => ({
        ...prev,
        initialBuy: 0,
      }));
    }
  };

  return (
    <div className="w-full mb-0 px-8">
      <h5 className="mb-8">
        Launch A New Token With <span className="text-green-500">Presale</span>
      </h5>
      <div className="flex mb-4 w-full items-center gap-4">
        <hr className="w-full border-borderColor" />
        <span className="whitespace-nowrap">
          Choose a chain<b className="text-red-500"> *</b>
        </span>
        <hr className="w-full border-borderColor" />
      </div>
      <div className="mb-5 flex flex-wrap">
        {chains.map((item, index) => (
          <div key={index} className="w-full sm:w-1/2 p-2">
            <button
              onClick={() => handleChainChange(item)}
              className={clsx(
                "text-[18px] bg-lighterColor whitespace-nowrap rounded-lg w-full text-center flex py-4 hover:bg-lightestColor border-2 border-borderColor justify-center items-center gap-3",
                selectedChain.id === item.id && "border-green-500"
              )}
            >
              <img
                src={`/assets/images/chains/${item.name}.png`}
                alt="chain-icon"
                className="w-9"
              />
              {item.name}
            </button>
          </div>
        ))}
      </div>
      <div className="flex mb-4 w-full items-center gap-4">
        <hr className="w-full border-borderColor" />
        <span className="whitespace-nowrap">
          Choose a dex<b className="text-red-500"> *</b>
        </span>
        <hr className="w-full border-borderColor" />
      </div>
      <div className="mb-5 flex flex-wrap">
        {getDex(selectedChain.id)?.map((item, index) => (
          <button
            key={index}
            onClick={() => handleSelectDex(item.name)}
            className={clsx(
              "text-[18px] bg-lighterColor rounded-lg w-1/2 text-center flex py-4 hover:bg-lightestColor border-2 justify-center items-center gap-3",
              selectedDex?.name === item.name && "border-green-500"
            )}
          >
            <img
              src={`/assets/images/dexs/${item.name}.png`}
              alt="chain-icon"
              className="w-9"
            />
            {item.name}
          </button>
        ))}
      </div>
      <div className="mb-5">
        <LabelText>Token Name</LabelText>
        <CustomInput name="name" onChange={handleChange} value={form.name} />
      </div>
      <div className="mb-5">
        <LabelText>Symbol</LabelText>
        <CustomInput
          name="symbol"
          onChange={handleChange}
          value={form.symbol}
        />
      </div>
      <div className="mb-5">
        <LabelText>Description</LabelText>
        <CustomTextarea
          onChange={handleChange}
          name="description"
          value={form.description}
        />
      </div>
      <div className="mb-5">
        <LabelText required={false}>Social Links (Optional)</LabelText>
        <CustomInput
          name="website"
          className="mb-3"
          placeholder="Website URL"
          icon={<IconWorld />}
          value={form.website}
          onChange={handleChange}
        />
        <CustomInput
          name="twitter"
          className="mb-3"
          placeholder="Twitter URL"
          icon={<IconBrandX />}
          value={form.twitter}
          onChange={handleChange}
        />
        <CustomInput
          name="telegram"
          className="mb-3"
          placeholder="Telegram Group URL"
          icon={<IconBrandTelegram />}
          value={form.telegram}
          onChange={handleChange}
        />
        <CustomInput
          name="discord"
          className="mb-3"
          placeholder="Discord URL"
          icon={<IconBrandDiscord />}
          value={form.discord}
          onChange={handleChange}
        />
      </div>
      <div className="mb-5">
        <LabelText>Initial Buy</LabelText>
        <span className="text-textDark text-[14px]">
          Optional: be the very first person to buy your token!
        </span>
        <div className="relative">
          <div className="flex gap-2 absolute left-2 top-1/2 z-[999] -translate-y-1/2">
            <img
              src={`/assets/images/chains/${selectedChain.name}.png`}
              alt="chain-icon"
              className="w-6"
            />
            <span>{getUnit(selectedChain.id)}</span>
          </div>
          <Input
            type="number"
            name="initialBuy"
            onChange={handleInitialBuyChange}
            value={form.initialBuy}
            icon={
              <button className="bg-gray-800 p-1 rounded-md">
                <IconTransfer size={12} />
              </button>
            }
            crossOrigin={"false"}
            labelProps={{ className: "content-none" }}
            className={clsx(
              "placeholder:opacity-50 text-gray-500 border-none mb-3 pl-[100px] text-lg appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            )}
            style={{ backgroundColor: "#211E2C" }}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
        <p className="text-[12px] mt-2 text-textDark">
          You receive 1.060B of newly created token
        </p>
      </div>

      <LabelText>Upload images</LabelText>
      <div className="mb-10 flex flex-wrap xl:flex-nowrap gap-4">
        <div className="relative">
          {!isEmpty(form.logo) && (
            <button
              onClick={() => handleClearImage("logo")}
              className="absolute top-2 right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 z-[9]"
            >
              <IconX size={16} />
            </button>
          )}
          <Upload
            component="div"
            action={undefined}
            beforeUpload={(file) => {
              handleImageUpload("logo")(file);
              return false; // Prevent default upload
            }}
          >
            <div className="hover:opacity-80 transition-all h-[150px] w-[160px] border-dashed border-2 bg-lighterColor border-gray-400 rounded-xl">
              {!isEmpty(form.logo) ? (
                <>
                  <img
                    src={form.logo}
                    alt="logo"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </>
              ) : (
                <div className="flex justify-center items-center w-full h-full">
                  {isUploadingLogo ? (
                    <div className="dot-flashing"></div>
                  ) : (
                    <div>
                      <IconPhotoPlus className="w-[30px] h-[30px] m-auto mb-2" />
                      <h6>logo</h6>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Upload>
        </div>
        <div className="relative w-full">
          {!isEmpty(form.banner) && (
            <button
              onClick={() => handleClearImage("banner")}
              className="absolute top-2 right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 z-[9]"
            >
              <IconX size={16} />
            </button>
          )}
          <Upload
            component="div"
            action={undefined}
            beforeUpload={(file) => {
              handleImageUpload("banner")(file);
              return false; // Prevent default upload
            }}
            className="w-full"
          >
            <div className="hover:opacity-80 transition-all w-full h-[150px] border-dashed border-2 bg-lighterColor border-gray-400 rounded-xl relative">
              {!isEmpty(form.banner) ? (
                <>
                  <img
                    src={form.banner}
                    alt="banner"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </>
              ) : (
                <div className="flex justify-center items-center w-full h-full">
                  {isUploadingBanner ? (
                    <div className="dot-flashing"></div>
                  ) : (
                    <div>
                      <IconPhotoPlus className="w-[30px] h-[30px] m-auto mb-2" />
                      <h6>Banner</h6>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Upload>
        </div>
      </div>
      <div className="mb-5 flex justify-center">
        <Checkbox
          name="policy"
          checked={form.policy as boolean}
          onChange={handleChange}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          color="green"
          crossOrigin={"false"}
          label={
            <p className="text-[12px]">
              I agree to the Hydrapad{" "}
              <a href="/" target="_blank" className="underline">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="" target="_blank" className="underline">
                Token Profile Policy
              </a>
            </p>
          }
        />
      </div>
      <div className="flex justify-between">
        {isConnected ? (
          <GradientButton
            disabled={!form.policy || isLoading}
            className={clsx(
              "rounded-lg w-full text-white",
              !form.policy && "opacity-50"
            )}
            onClick={handleCreatePresale}
          >
            {isLoading ? (
              <div className="flex py-[6px] gap-8 items-center justify-center">
                <div className="dot-flashing ml-4"></div>
              </div>
            ) : (
              <span>
                {chainId === selectedChain.id
                  ? "Create Presale"
                  : "Switch Network"}
              </span>
            )}
          </GradientButton>
        ) : (
          <GradientButton
            className="rounded-lg w-full flex gap-3 justify-center items-center text-white"
            onClick={() => open()}
          >
            <IconWallet color="white" />
            Connect Wallet
          </GradientButton>
        )}
      </div>
    </div>
  );
};
export default TokenForm;
