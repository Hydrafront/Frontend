import UpSvg from '@/components/icons/Up-svg'
import { IconSettings } from '@tabler/icons-react'
import { useNavigate } from 'react-router'
import { PresaleCardType } from '../../managePresale/PresaleCard'
import clsx from 'clsx'
import { getStepColor } from '@/utils/func'
import { Tooltip } from '@material-tailwind/react'

const InvestmentCard: React.FC<PresaleCardType> = props => {
  const navigate = useNavigate()

  return (
    <div className='sm:flex justify-between bg-lighterColor rounded-lg p-3 mb-2 hover:opacity-75'>
      <div className='flex w-full sm:w-2/5 pr-2 items-center lg:items-start'>
        <img
          src={props.avatar}
          alt='investment-image'
          className='w-[40px] h-[40px] rounded-full mr-2'
        />
        <div className='flex sm:block lg:flex'>
          <div>
            <p>
              <span>{props.name}</span>{' '}
              <span className='font-bold'>&{12.33}</span>
            </p>
            <p className='text-[11px]'>
              <span>Solana</span>{' '}
              <span className='text-gray-600'>- Network</span>
            </p>
          </div>
          <div className='flex'>
            <div>
              <div className='text-[10px] flex items-center pt-1 ml-2 sm:ml-0 lg:ml-2'>
                <span className='rounded-sm mr-1 px-1 text-greenColor bg-[#00D26C1F]'>
                  {0.05}%
                </span>
                <UpSvg />
              </div>
            </div>
            <div>
              <div className='rounded-sm mt-1 ml-2 bg-lightestColor px-1 flex items-center'>
                <div
                  className={clsx(
                    'w-[5px] h-[5px] rounded-full mr-1',
                    getStepColor(props.step)
                  )}
                ></div>
                <span className='text-[10px]'>
                  {props.step.toUpperCase()} PRESALE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full sm:w-2/5 px-2 mt-2 sm:mt-0'>
        <div className='flex justify-around py-1 border-b border-gray-500'>
          <span className='text-xs w-1/3 text-center text-gray-500'>
            INVESTED
          </span>
          <span className='text-xs w-1/3 text-center text-gray-500'>
            BALANCE
          </span>
          <span className='text-xs w-1/3 text-center text-gray-500'>VALUE</span>
        </div>
        <div className='flex justify-around pt-2'>
          <span className='text-xs w-1/3 text-center text-gray-500'>
            {2.3} SQL
          </span>
          <span className='text-xs w-1/3 text-center text-gray-500'>
            {12312} DOGE
          </span>
          <p className='text-xs w-1/3 text-center text-gray-500'>
            234.03 <span className='text-greenColor ml-1'>+{3.3}%</span>
          </p>
        </div>
        <div className='flex justify-center pt-5'>
          <Tooltip content='Manage Positions' className='m-auto'>
            <button
              className='orange-gradient rounded-lg flex lg:w-[168px] font-primary px-5 py-1 sm:hidden items-center'
              onClick={() => navigate('/presale-detail/' + props.id + "/"+(props.type === "Regular Presale" ? 1:0))}
            >
              <IconSettings className='w-5 mr-1' />
              <span>Manage Positions</span>
            </button>
          </Tooltip>
        </div>
      </div>
      <div className='flex justify-end items-center'>
        <Tooltip content='Manage Positions' className='lg:hidden'>
          <button
            className='orange-gradient rounded-lg hidden lg:w-[168px] font-primary px-5 py-1 sm:flex items-center'
            onClick={() => navigate('/presale-detail/' + props.id + "/"+(props.type === "Regular Presale" ? 1:0))}
          >
            <IconSettings className='w-5 mr-1' />
            <span className='hidden lg:block'>Manage Positions</span>
          </button>
        </Tooltip>
      </div>
    </div>
  )
}
export default InvestmentCard
