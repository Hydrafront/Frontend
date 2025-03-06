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
import { useAccount, useChains } from "wagmi";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Checkbox, Input } from "@material-tailwind/react";
import { useForm } from "@/hooks/useForm";
import { getDex } from "@/utils/config/chainDexConfig";
import { toast } from "react-toastify";
import { Chain } from "viem";
import {
  createTokenInfo,
  uploadImageToPinata,
} from "@/store/actions/token.action";
import { generateSignature } from "@/utils/func";
import { isEmpty } from "@/utils/validation";
import { getContractAddress } from "@/utils/func";
import { useChainId } from "wagmi";
import { useCreatePresaleToken } from "@/utils/contractUtils";
import Spin2 from "@/components/spins/spin2/Spin2";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { createTokenEmit } from "@/socket/token";

const MAX_FILE_SIZE = 1024 * 1024; // 1MB

export interface FormType {
  name: string;
  symbol: string;
  description: string;
  logo: string | undefined;
  banner: string | undefined;
  website: string;
  twitter: string;
  telegram: string;
  discord: string;
  initialBuy: number;
  [key: string]: unknown; // Add index signature
}

const TokenForm: React.FC = () => {
  const { open } = useWeb3Modal();
  const chains = useChains();
  const chainId = useChainId();
  const {
    createPresaleToken,
    isLoading: isContractLoading,
    UserRejectedRequestError,
  } = useCreatePresaleToken();
  const { isConnected, address } = useAccount();
  const [selectedChain, setSelectedChain] = useState<Chain>(chains[0]);
  const [selectedDex, setSelectedDex] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [creationStep, setCreationStep] = useState<
    "idle" | "uploading" | "creating" | "completed" | "error"
  >("idle");
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const contractAddress = getContractAddress(selectedChain.id);

  useEffect(() => {
    setSelectedDex(getDex(chains[0].id)?.[0]);
  }, [chains]);

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
  });

  const handleChainChange = async (value: Chain) => {
    try {
      if (chainId !== value?.id) {
        setSelectedChain(value);
        toast.success("Switched to " + value.name);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageUpload =
    (imageType: "logo" | "banner") => async (file: File) => {
      if (imageType === "logo") {
        setIsUploadingLogo(true);
      } else {
        setIsUploadingBanner(true);
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File size must be less than 1MB");
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

  const handleCreatePresale = async () => {
    const nonce = Date.now();

    if (
      isEmpty(form.name) ||
      isEmpty(form.symbol) ||
      isEmpty(form.description) ||
      isEmpty(form.logo) ||
      isEmpty(form.banner)
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    // create presale token
    let tokenAddress: `0x${string}` | undefined = undefined;
    try {
      const { signature } = await generateSignature(
        form.name,
        form.symbol,
        nonce,
        contractAddress,
        chainId,
        address as `0x${string}`,
        import.meta.env.VITE_PRIVATE_KEY
      );
      setIsLoading(true);
      setCreationStep("uploading");
      const receipt = await createPresaleToken(
        form.name,
        form.symbol,
        nonce,
        signature as `0x${string}`
        // form.initialBuy
      );

      tokenAddress = receipt?.logs[0].address;
      console.log("token created on blockchain", tokenAddress);

      if (tokenAddress && form.logo && form.banner) {
        const { token } = await createTokenInfo(tokenAddress as `0x${string}`, {
          price: 0,
          marketCap: 1000,
          type: "presale",
          creator: address as `0x${string}`,
          description: form.description,
          dex: selectedDex as string,
          chainId: selectedChain.id,
          name: form.name,
          symbol: form.symbol,
          logo: form.logo as string,
          banner: form.banner as string,
          website: form.website,
          twitter: form.twitter,
          telegram: form.telegram,
          discord: form.discord,
        });
        createTokenEmit(token);
      } else {
        throw new Error("Token address or image upload failed");
      }
      setCreationStep("completed");
      toast.success("Token created successfully");
      setIsLoading(false);
    } catch (error) {
      console.log("Error in token creation", error);

      //Reset the creation step to allow the user to try again
      setCreationStep("idle");

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
  };

  const getStatusText = () => {
    if (creationStep === "creating")
      return isContractLoading ? (
        <span className="text-textDark">
          Wating for blockchain confirmation...
        </span>
      ) : (
        <span className="text-textDark">Creating token on blockchain...</span>
      );
    if (creationStep === "completed")
      return (
        <span className="text-textDark">
          Token created successfully on blockchain
        </span>
      );
    if (creationStep === "error")
      return (
        <span className="text-red-500">
          Error occurred. Visit Portfolio to Update TokenInfo
        </span>
      );
  };

  return (
    <div className="w-full mb-0 px-8">
      <h5 className="mb-8">
        Launch A New Token With <span className="text-green-500">Presale</span>
      </h5>
      <div className="flex mb-4 w-full items-center gap-4">
        <hr className="w-full border-borderColor" />
        <span className="whitespace-nowrap">Choose a chain</span>
        <hr className="w-full border-borderColor" />
      </div>
      <div className="mb-5 flex flex-wrap">
        {chains.map((item, index) => (
          <button
            key={index}
            onClick={() => handleChainChange(item)}
            className={clsx(
              "text-[18px] bg-lighterColor rounded-lg w-full sm:w-1/2 text-center flex py-4 hover:bg-lightestColor border-2 justify-center items-center gap-3",
              chainId === item.id && "border-green-500"
            )}
          >
            <img
              src={`/assets/images/chains/Polygon.png`}
              alt="chain-icon"
              className="w-9"
            />
            {item.name}
          </button>
        ))}
      </div>
      <div className="flex mb-4 w-full items-center gap-4">
        <hr className="w-full border-borderColor" />
        <span className="whitespace-nowrap">Choose a dex</span>
        <hr className="w-full border-borderColor" />
      </div>
      <div className="mb-5 flex flex-wrap">
        {getDex(selectedChain.id)?.map((item, index) => (
          <button
            key={index}
            onClick={() => setSelectedDex(item)}
            className={clsx(
              "text-[18px] bg-lighterColor rounded-lg w-1/2 text-center flex py-4 hover:bg-lightestColor border-2 justify-center items-center gap-3",
              selectedDex === item && "border-green-500"
            )}
          >
            <img
              src={`/assets/images/dexs/Uniswap.png`}
              alt="chain-icon"
              className="w-9"
            />
            {item}
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
        <LabelText>Social Links (Optional)</LabelText>
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
              src="/assets/images/chains/Polygon.png"
              alt="polygon-icon"
              className="w-6"
            />
            <span>POL</span>
          </div>
          <Input
            type="number"
            min={0}
            name="initialBuy"
            onChange={handleChange}
            value={form.initialBuy}
            icon={
              <button className="bg-gray-800 p-1 rounded-md">
                <IconTransfer size={12} />
              </button>
            }
            crossOrigin={"false"}
            labelProps={{ className: "content-none" }}
            className={clsx(
              "placeholder:opacity-50 text-gray-500 border-none mb-3 pl-[70px] appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
                    <Spin2 />
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
                    <Spin2 />
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
              <div className="flex py-2 gap-8 items-center justify-center">
                <div className="dot-flashing m-auto"></div>
              </div>
            ) : (
              <span>Create Presale</span>
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
      <div className="mt-5">
        <p className="text-textDark text-[14px]">{getStatusText()}</p>
      </div>
    </div>
  );
};
export default TokenForm;
