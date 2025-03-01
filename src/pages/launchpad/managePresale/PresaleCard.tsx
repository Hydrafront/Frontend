// import DownloadSvg from '@/components/icons/Download-svg'
import SettingSvg from '@/components/icons/Setting-svg'
import clsx from 'clsx'
import { useNavigate } from 'react-router'

export interface PresaleCardType {
  id: string
  step: string
  avatar: string
  name: string
  type: string
}

const PresaleCard: React.FC<PresaleCardType> = props => {
  const navigate = useNavigate()

  const getColor = (step: string) => {
    if (step === 'Live') {
      return 'bg-greenColor'
    } else if (step === 'Upcoming') {
      return 'bg-orange-500'
    } else {
      return 'bg-purple-500'
    }
  }

  const handleClickManage = () => {
    navigate(`/manage-position/${(props.type === "Regular Presale" ? 1:0)}`)
  }

  return (
    <div className='rounded-xl bg-lighterColor py-3 px-5 mb-4'>
      <div className='flex justify-between'>
        <div className='flex items-center'>
          <div
            className={clsx(
              'w-[8px] h-[8px] mr-2 rounded-full',
              getColor(props.step)
            )}
          ></div>
          <span className='text-[11px]'>{props.step.toUpperCase()}</span>
          <span className='text-[11px]'>6:12:43:34:22</span>
        </div>
      </div>
      <div className='flex items-center mb-5 mt-6'>
        <div className='relative'>
          {/* <img src="/assets/images/status/1.png" alt="status" className="absolute -top-[10px] -left-[10px] w-[28px] h-[28px]" /> */}
          <img
            src='/assets/images/avatars/a.png'
            alt='avatar'
            className='mr-4 rounded-full w-[51px] h-[51px]'
          />
        </div>
        <div className='text-white'>
          <p className='text-[18px]'>{props.name}</p>
          <p className='text-[11.5px]'>{props.type}</p>
          {/* <p className="text-[11.5px]">Spots Left 2499990</p> */}
        </div>
      </div>
      <div className='lg:flex justify-between flex-wrap gap-1 -mx-1'>
        <button className='text-[13px] flex w-full lg:w-auto justify-center items-center bg-bgColor rounded-md cursor-pointer px-5 py-2 gap-2' onClick={handleClickManage}>
          <SettingSvg width={17} height={17} />
          <span className='ml-1 text-[13px]'>Manage Presale</span>
        </button>
        {/* <GradientButton className="text-[13px] rounded-md py-0" style={{padding: "4px 5px"}} onClick={handleClickTrade}>Trade Live on Dex</GradientButton> */}
        {/* <button
          className='text-[13px] w-full lg:w-auto justify-center mt-3 lg:mt-0 rounded-md font-primary bg-purple-900 text-white flex items-center'
          style={{ padding: '4px 5px' }}
        >
          <DownloadSvg className='mr-2 mt-[1px]' /> Investor CSV File
        </button> */}
      </div>
    </div>
  )
}
export default PresaleCard
