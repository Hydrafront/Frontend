import { useState } from "react";
import LockToken from "./LockToken";
import Preview from "./Preview";
import Pagination from '@/components/common/Pagination'
import { IconDots } from "@tabler/icons-react";
import { useAccount, useReadContract } from "wagmi";
import abi from './ABI.json';

const Locks: React.FC = () => {
  const { address } = useAccount();
  const { data } = useReadContract({
    abi,
    address: '0xc65b8b8c23fe8a94967650c5f8310494725eceb3',
    functionName: 'getCreatorLocks',
    args: [
      address
    ],
  })
  console.log("res", data)
  const [enabled, setEnabled] = useState(false);

  const handleNext = () => {
    setEnabled(true)
  }

  return (
    <div className="h-[calc(100vh-178px)] overflow-y-scroll pb-3">
      {!enabled ?
        <div className="py-10 px-5 flex flex-col gap-10">
          <div className="flex justify-between items-center">
            <span className="py-1 px-10 bg-orange border-b border-white active-orange">Locks</span>
            <span>All Networks</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Assets</span>
            <div className="flex items-center gap-3">
              <button className="bg-grey1 py-2 px-3 rounded-md">BY APP</button>
              <button className="bg-grey1 py-2 px-3 rounded-md">BY TOKEN</button>
              <button className="bg-grey1 py-2 px-3 rounded-md">
                <IconDots />
              </button>
            </div>
          </div>
          <button className="flex justify-center items-center px-10 gap-3 w-fit bg-grey2" onClick={handleNext}>
            <span className="text-[36px]">+</span>
            <span>Create a Lock</span>
          </button>
          <div className="overflow-auto">
            <table className="mt-5 w-full">
              <thead>
                <th className="opacity-70">ASSET</th>
                <th className="opacity-70">Contract Address</th>
                <th className="opacity-70">Unlock Date</th>
                <th className="opacity-70">Duration</th>
                <th className="opacity-70">Lock Contract</th>
                <th></th>
              </thead>
              <tbody id="locks-table">
                <tr>
                  <td>
                    <div className='flex items-center my-4'>
                      <div className='relative'>
                        <img className='absolute -top-[2px] rounded-full -left-[2px] w-[24px] h-[24px]' alt='' src="/assets/images/1027.png" />
                        <img
                          src="/assets/images/avatars/a.png"
                          alt='avatar'
                          className='mr-4 rounded-full min-w-[51px] h-[51px]'
                        />
                      </div>
                      <div className='text-white'>
                        <p className='text-[16px]'>DOGE</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center gap-2">
                      <span className="px-2 bg-grey3 rounded-md max-w-[150px] truncate">0x2459440684581EE4EC6B20D4D5C3d58795EA757F</span>
                      <a className="w-5" href="https://sepolia.etherscan.io/address/0x2459440684581EE4EC6B20D4D5C3d58795EA757F" target="_blank"><img src="/assets/icons/external.svg" width="20" height="20" /></a>
                    </div>
                  </td>
                  <td align="center">10/11/2024</td>
                  <td align="center">6 Months</td>
                  <td align="center">
                    <div className="flex justify-center gap-2">
                      <span className="px-2 bg-grey3 rounded-md max-w-[150px] truncate">0x2459440684581EE4EC6B20D4D5C3d58795EA757F</span>
                      <a className="w-5" href="https://sepolia.etherscan.io/address/0x2459440684581EE4EC6B20D4D5C3d58795EA757F" target="_blank"><img src="/assets/icons/external.svg" width="20" height="20" /></a>
                    </div>
                  </td>
                  <td>
                    <div className="p-2 bg-green-500 rounded-br-lg rounded-tr-lg">Unlock</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className='flex items-center my-4'>
                      <div className='relative'>
                        <img className='absolute -top-[2px] rounded-full -left-[2px] w-[24px] h-[24px]' alt='' src="/assets/images/1027.png" />
                        <img
                          src="/assets/images/avatars/a.png"
                          alt='avatar'
                          className='mr-4 rounded-full min-w-[51px] h-[51px]'
                        />
                      </div>
                      <div className='text-white'>
                        <p className='text-[16px]'>DOGE</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center gap-2">
                      <span className="px-2 bg-grey3 rounded-md max-w-[150px] truncate">0x2459440684581EE4EC6B20D4D5C3d58795EA757F</span>
                      <a href="https://sepolia.etherscan.io/address/0x2459440684581EE4EC6B20D4D5C3d58795EA757F" target="_blank"><img src="/assets/icons/external.svg" /></a>
                    </div>
                  </td>
                  <td align="center">10/11/2024</td>
                  <td align="center">6 Months</td>
                  <td align="center">
                    <div className="flex justify-center gap-2">
                      <span className="px-2 bg-grey3 rounded-md max-w-[150px] truncate">0x2459440684581EE4EC6B20D4D5C3d58795EA757F</span>
                      <a href="https://sepolia.etherscan.io/address/0xEE4Aa73F6F62FC4A9eE4dB351Babb194670c931A" target="_blank"><img src="/assets/icons/external.svg" /></a>
                    </div>
                  </td>
                  <td>
                    <div className="p-2 bg-green-500 rounded-br-lg rounded-tr-lg">Unlock</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-center items-center">
            <Pagination pageCount={5} />
          </div>
        </div>
        :
        <div className="bg-lightColor py-10 px-5 rounded-lg flex flex-wrap">
          <LockToken setEnabled={setEnabled} />
          <Preview />
        </div>
      }
    </div>
  )
}
export default Locks;