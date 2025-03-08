import InfoSvg from '@/components/icons/Info-svg'
import BorderBox from '../../../components/common/BorderBox'
import { Button, Progress } from '@material-tailwind/react'
import DocSvg from '@/components/icons/Doc-svg'
import VectorSvg from '@/components/icons/Vector-svg'
import { IconArrowsUpDown } from '@tabler/icons-react'

interface RightSidebarProps {
  type?: string | undefined;
}

const Info: React.FC<RightSidebarProps> = ({ type }) => {
  return (
    <div className='mb-2'>
      <div className='w-full lg:w-[334px] px-2 pt-10 overflow-y-scroll h-full' id="token-info">
        <div className='bg-darkPurple flex mb-8 justify-center items-center rounded-md py-1'>
          <div className='w-[11px] h-[11px] bg-greenColor rounded-full'></div>
          <p className='ml-3'>LIVE PRESALE</p>
        </div>
        <BorderBox className='flex p-3 mb-4'>
          <div className='w-1/2'>
            <p>
              <span className='text-gray-600'>Ticker:</span> APE
            </p>
          </div>
          <div className='w-1/2'>
            <p>
              <span className='text-gray-600'>Chain:</span>
            </p>
          </div>
        </BorderBox>
        <BorderBox className='p-3 text-center mb-4'>
          <p className='text-gray-600'>PRICE</p>
          <p>0.0 1012 vETH</p>
        </BorderBox>
        {type === "erc20" &&
          <>
            <div className='bg-darkPurple flex justify-between pl-5 pr-10 rounded-lg py-2 mb-1'>
              <span>0</span>
              <span>vETH</span>
            </div>
            <div className='flex justify-center'>
              <IconArrowsUpDown color='green' className='cursor-pointer hover:opacity-75' />
            </div>
          </>
        }
        <div className='bg-darkPurple flex justify-between pl-5 pr-10 rounded-lg py-2 mb-4 mt-1'>
          <span>0</span>
          <span>APE</span>
        </div>
        <div className='w-full px-5 mb-3 border-r border-l border-borderColor'>
          <Button fullWidth color='green' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            {type === "presale" ? "BUY" : "SWAP"}
          </Button>
        </div>
        <BorderBox className='mb-5'>
          <div className='bg-borderColor py-2 text-center'>Stats</div>
          {type === "presale" &&
            <div className='flex flex-col gap-2.5 p-2'>
              <div className='flex items-center text-[14px]'>
                Presale Progress Bar 0.453 <InfoSvg className='ml-2' />
              </div>
              <Progress
                color='green'
                style={{ backgroundColor: '#99999940' }}
                value={80}
                variant='gradient'
                className='h-4'
                placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
              />
            </div>
          }
          <div className={'flex p-2' + (type === "presale" ? ' border-t border-borderColor' : '')}>
            <div className='w-1/2 flex flex-col justify-between'>
              <div>
                <p className='text-textDark text-[12px]'>TXSN</p>
                <p className='text-[12px]'>2</p>
              </div>
              <div>
                <p className='text-textDark text-[12px]'>VOLUME</p>
                <p className='text-[12px]'>0.0303 vETH</p>
              </div>
              {/* <div>
                <p className='text-textDark text-[12px]'>UNIQUE TRADERS</p>
                <p className='text-[12px]'>1</p>
              </div> */}
            </div>
            <div className='w-1/2 flex flex-col justify-between'>
              <div className='mb-4'>
                <div className='flex justify-between'>
                  <div>
                    <p className='text-textDark text-[12px]'>BUYS</p>
                    <p className='text-[12px]'>2</p>
                  </div>
                  <div>
                    <p className='text-textDark text-[12px]'>SELLS</p>
                    <p className='text-[12px]'>0</p>
                  </div>
                </div>
                <Progress color='green' value={100} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
              </div>
              <div className=''>
                <div className='flex justify-between'>
                  <div>
                    <p className='text-textDark text-[12px]'>BUY VOL</p>
                    <p className='text-[12px]'>0.0303</p>
                  </div>
                  <div>
                    <p className='text-textDark text-[12px]'>SELL VOL</p>
                    {/* <p className='text-[12px]'>0</p> */}
                  </div>
                </div>
              </div>
              {/* <div className='mb-4'>
                <div className='flex justify-between'>
                  <div>
                    <p className='text-textDark text-[12px]'>BUYERS</p>
                    <p className='text-[12px]'>1</p>
                  </div>
                  <div>
                    <p className='text-textDark text-[12px]'>SELLERS</p>
                    <p className='text-[12px]'>0</p>
                  </div>
                </div>
                <Progress color='green' value={100} />
              </div> */}
            </div>
          </div>
        </BorderBox>
        <BorderBox className='p-3'>
          {type === "presale" ?
            <div className='flex flex-col gap-5'>
              <button className='p-2 bg-pink text-white rounded-lg'>
                Withdraw Fund
              </button>
              <button className='p-2 bg-green-500 text-white rounded-lg'>
                CLAIM TOKEN
              </button>
            </div>
            :
            <>
              <div className='flex items-center mb-2'>
                Bonding curve progress: 0.453 <InfoSvg className='ml-2' />
              </div>
              <Progress
                color='green'
                style={{ backgroundColor: '#99999940' }}
                value={80}
                variant='gradient'
                className='h-4'
                placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
              />
            </>
          }
        </BorderBox>
        {/* <BorderBox className='p-3 mb-3'>
          <p className='text-[12px] px-2 my-3'>Switch to WIF</p>
          <div className='flex justify-between my-3 px-2'>
            <span className='text-[12px]'>Reset</span>
            <span className='text-[12px]'>0.2 vETH</span>
            <span className='text-[12px]'>0.5 vETH</span>
            <span className='text-[12px]'>1 vETH</span>
          </div>
          <p className='text-[12px] px-2 mb-2'>1.4 vETH</p>
          <p className='text-[12px] px-2 mb-2'>You will receive 0 (~) WIF</p>
          <Button className='mb-3 bg-gray-300 text-black' fullWidth>
            Place Trade
          </Button>
          <Button className='mb-3 bg-gray-300 text-black' fullWidth>
            Ape remaining curve
          </Button>
          <p className='text-[12px] px-2'>Your balace: 0 (~0)</p>
        </BorderBox> */}
        <div className='flex justify-between items-center py-3 border-b border-borderColor'>
          <p>Contract Address</p>
          <div className='flex items-center'>
            <div className='rounded-md px-2 py-1 flex items-center bg-borderColor overflow-x-hidden text-sm max-w-32 text-ellipsis text-nowrap'>
              <DocSvg className='mr-1' />
              0xc23fdsv23c2cd 233rfdsaf
            </div>
            <VectorSvg className='ml-2' />
          </div>
        </div>
        <div className='flex justify-between items-center py-3 border-b border-borderColor'>
          <p>Creator wallet</p>
          <div className='flex items-center'>
            <div className='rounded-md px-2 py-1 flex items-center bg-borderColor overflow-x-hidden text-sm max-w-32 text-ellipsis text-nowrap'>
              <DocSvg className='mr-1' />
              0xc23fdsv23c2cd 233rfdsaf
            </div>
            <VectorSvg className='ml-2' />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Info
