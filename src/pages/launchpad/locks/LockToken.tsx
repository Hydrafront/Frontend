import CustomInput from "@/components/common/CustomInput";
import CustomSelect from "@/components/common/CustomSelect";
import GradientButton from "@/components/common/GradientButton";
import LabelText from "@/components/common/LabelText";
import { Dispatch, SetStateAction, useState } from "react";
import { useWriteContract } from "wagmi";
import abi from "./ABI.json";
// import ERC20Abi from "./ERC20.json";
import { parseEther } from "viem";

const lockDurationOptions: { title: string, value: string }[] = [
  { title: "3 months", value: '3m' },
  { title: "6 months", value: '6m' },
  { title: "1 year", value: '1y' },
  { title: "1.5 years", value: "1.5y" },
  { title: "2 years", value: "2y" },
]

interface LockTokenProps {
  setEnabled: Dispatch<SetStateAction<boolean>>;
}

const LockToken: React.FC<LockTokenProps> = ({ setEnabled }) => {
  const [_token, _setToken] = useState("0x599777F03f97ce4c039689b197fF6542fd990fca");
  const [_amount, _setAmount] = useState("");
  const [_lockDuration, _setLockDuration] = useState("");
  const { writeContractAsync } = useWriteContract();

  const createLock = async () => {
    let _tmpLockDuration;
    if (_lockDuration === "3m") _tmpLockDuration = 3 * 30 * 24 * 3600
    if (_lockDuration === "6m") _tmpLockDuration = 6 * 30 * 24 * 3600
    if (_lockDuration === "1y") _tmpLockDuration = 12 * 30 * 24 * 3600
    if (_lockDuration === "1.5y") _tmpLockDuration = 18 * 30 * 24 * 3600
    if (_lockDuration === "2y") _tmpLockDuration = 24 * 30 * 24 * 3600
    console.log(_token, _amount, _tmpLockDuration)
    try {
      // const data = await writeContractAsync({
      //   abi: ERC20Abi,
      //   address: _token as Address,
      //   functionName: "approve",
      //   args: [
      //     "0xc65b8b8c23fe8a94967650c5f8310494725eceb3",
      //     parseEther(_amount.toString()),
      //   ],
      // })
      // if(data)
        await writeContractAsync({
          abi,
          address: "0xc65b8b8c23fe8a94967650c5f8310494725eceb3",
          functionName: "createLock",
          args: [
            _token,
            parseEther(_amount.toString(),),
            _tmpLockDuration
          ],
        })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="w-full md:w-1/2 mb-10 md:mb-0 px-8">
      <h5 className="mb-6">LOCK TOKEN</h5>
      <div className="mb-5">
        <LabelText>Token Contract Address</LabelText>
        <CustomInput placeholder="Enter Token contract address" value={_token} onChange={e => _setToken(e.target.value)} />
      </div>
      <div className="mb-10 mt-5">
        <LabelText>Token Lock amount</LabelText>
        <CustomInput placeholder="Enter lock amount" type="number" min={0} value={_amount} onChange={e => _setAmount(e.target.value)} />
      </div>
      <div className="mb-10 mt-5">
        <LabelText>Choose Lock Duration</LabelText>
        <CustomSelect options={lockDurationOptions} label="Select lock duration" value={_lockDuration} onChange={e => _setLockDuration(e as string)} />
      </div>
      <GradientButton className="w-full rounded-lg mb-4" onClick={createLock}>Create Lock</GradientButton>
      <button className="px-5 py-2 w-full rounded-lg bg-borderColor mb-8" onClick={() => setEnabled(false)}>Back</button>
    </div>
  )
}
export default LockToken; 