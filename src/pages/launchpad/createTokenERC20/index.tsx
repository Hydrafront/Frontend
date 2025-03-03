import { useState } from "react";
import TokenForm from "./TokenForm";

export interface PresaleTokenFormProps {
  chain: {
    name: string;
  };
  dex: {
    name: string;
  };
  symbol: string;
  name: string;
  description: string;
  avatar: string;
  banner: string;
  links: { label: string; link: string; }[];
  initualBuy: number;
}

const CreateTokenERC20: React.FC = () => {
  const [form, setForm] = useState<PresaleTokenFormProps>({
    chain: { name: '' },
    dex: { name: '' },
    symbol: "",
    name: "",
    description: "",
    avatar: "",
    banner: "",
    links: [],
    initualBuy: 0,
  });
  return (
    <div className="px-4">
      <div className="bg-lightColor py-10 px-5 rounded-lg flex flex-wrap w-full xl:w-2/3 mx-auto my-8">
        <TokenForm setForm={setForm} form={form} />
      </div>
    </div>
  );
};
export default CreateTokenERC20;
