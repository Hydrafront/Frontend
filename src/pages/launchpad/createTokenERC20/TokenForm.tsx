import CustomInput from "@/components/common/CustomInput";
import GradientButton from "@/components/common/GradientButton";
import LabelText from "@/components/common/LabelText";
import {
  IconHelpOctagon,
  IconPhotoPlus,
  IconWallet,
} from "@tabler/icons-react";
import Upload from "rc-upload";
import { useAccount, useChains } from "wagmi";
import { useState } from "react";
import clsx from "clsx";
import { Checkbox, Tooltip } from "@material-tailwind/react";
import { Chain } from "wagmi/chains";
import { useForm } from "@/hooks/useForm";

export interface FormType {
  name: string;
  symbol: string;
  logo: string;
  maxSupply: number;
  decimal: number;
  [key: string]: unknown; // Add index signature
}
const TokenForm: React.FC = () => {
  const chains = useChains();
  const { isConnected } = useAccount();
  const [selectedChain, setSelectedChain] = useState<Chain>(chains[0]);


  const { form, setForm } = useForm<FormType>({
    name: "",
    symbol: "",
    maxSupply: 0,
    logo: "",
    decimal: 18,
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev: FormType) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChainChange = async (value: Chain) => {
    setSelectedChain(value);
  };
  

  // const handleSelectChange = (key: string, value: string) => {
  //   setForm({
  //     ...form,
  //     [key]: value,
  //   });
  // };
  return (
    <div className="w-full mb-0 px-8">
      <h5 className="mb-8">
        Create an <span className="text-green-500">ERC20</span> Token
      </h5>
      <div className="flex mb-4 w-full items-center gap-4">
        <hr className="w-full border-borderColor" />
        <span className="whitespace-nowrap">Choose a chain</span>
        <hr className="w-full border-borderColor" />
      </div>
      <div className="mb-5 flex flex-wrap">
        {chains.map((chain, index) => (
          <div key={index} className="w-full sm:w-1/2 p-2">
            <button
              onClick={() => handleChainChange(chain)}
              className={clsx(
                "text-[18px] bg-lighterColor rounded-lg w-full text-center flex py-4 hover:bg-lightestColor border-2 border-borderColor justify-center items-center gap-3",
                selectedChain.id === chain.id && "border-green-500"
              )}
          >
            <img
              src={`/assets/images/chains/${chain.name}.png`}
              alt="chain-icon"
              className="w-9"
            />
              {chain.name === "Polygon" ? "Polygon Pos" : chain.name}
            </button>
          </div>
        ))}
      </div>
      <div className="flex mb-4 w-full items-center gap-4">
        <hr className="w-full border-borderColor" />
        <span className="whitespace-nowrap">Choose a dex</span>
        <hr className="w-full border-borderColor" />
      </div>

      <div className="mb-5">
        <LabelText>Token Name</LabelText>
        <CustomInput name="name" onChange={handleInputChange} />
      </div>
      <div className="mb-5">
        <LabelText>Symbol</LabelText>
        <CustomInput name="symbol" />
      </div>
      <div className="mb-5">
        <LabelText>Max Supply</LabelText>
        <CustomInput type="number" name="max_supply" />
      </div>
      <div className="mb-5">
        <LabelText>Decimal</LabelText>
        <CustomInput type="number" name="decimal" value="18" readOnly />
      </div>

      <LabelText>Upload images</LabelText>
      <div className="mb-10 flex flex-wrap xl:flex-nowrap gap-4">
        <Upload component="div" value={form.logo}>
          <div className="h-[150px] w-[160px] border-dashed border-2 bg-lighterColor border-gray-400 flex justify-center items-center rounded-xl">
            <div>
              <IconPhotoPlus className="w-[30px] h-[30px] m-auto mb-2" />
              <h6>Avatar</h6>
            </div>
          </div>
        </Upload>
        <div>
          <div className="flex items-center gap-2">
            <Checkbox
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              color="green"
              crossOrigin={"false"}
              label={<span>Burnable</span>}
            />
            <Tooltip
              content="Token holders will be able to destroy their tokens."
              placement="right"
            >
              <IconHelpOctagon size={16} className="cursor-pointer" />
            </Tooltip>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              color="green"
              crossOrigin={"false"}
              label={<span>Mintable</span>}
            />
            <Tooltip
              content="Privileged acounts will be able to create more supply."
              placement="right"
            >
              <IconHelpOctagon size={16} className="cursor-pointer" />
            </Tooltip>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              color="green"
              crossOrigin={"false"}
              label={<span>Permit</span>}
            />
            <Tooltip
              content="Without paying gas, token holders will be able to allow third parties to transfer from their account."
              placement="right"
            >
              <IconHelpOctagon size={16} className="cursor-pointer" />
            </Tooltip>
          </div>
          <div className="px-3 mx-3 text-textDark text-[12px] border border-borderColor py-2 rounded-sm">
            Note: Mintable Option is not recommended without valid
            recommendation
          </div>
        </div>
      </div>
      <div className="mb-5 flex justify-center">
        <Checkbox
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          color="green"
          crossOrigin={"false"}
          label={
            <p className="text-[12px]">
              I agree to the Hydrapad <a href="/">Terms and Conditions</a> and{" "}
              <a href="">Token Profile Policy</a>
            </p>
          }
        />
      </div>
      <div className="flex justify-between">
        {isConnected ? (
          <GradientButton className="rounded-lg w-full text-white">
            Create Presale
          </GradientButton>
        ) : (
          <GradientButton className="rounded-lg w-full flex gap-3 justify-center items-center text-white">
            <IconWallet color="white" />
            Connect Wallet
          </GradientButton>
        )}
      </div>
    </div>
  );
};
export default TokenForm;
