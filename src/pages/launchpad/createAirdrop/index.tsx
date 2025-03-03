import CustomInput from '@/components/common/CustomInput'
import CustomSelect from '@/components/common/CustomSelect'
import GradientButton from '@/components/common/GradientButton'
import LabelText from '@/components/common/LabelText'
import { FileUploader } from 'react-drag-drop-files'

const chainOptions: { title: string; value: string }[] = [
  { title: 'A', value: 'a' },
  { title: 'B', value: 'b' },
  { title: 'C', value: 'c' }
]

const CreateAirdrop: React.FC = () => {
  return (
    <div className=' h-[calc(100vh-220px)] overflow-y-scroll pb-3'>
      <div className='bg-lightColor py-10 px-5 rounded-lg lg:w-2/3 xl:w-1/2 m-auto mt-10'>
        <h5 className='mb-5'>AIRDROP</h5>
        <div className='mb-10 mt-5'>
          <LabelText>Select chain</LabelText>
          <CustomSelect options={chainOptions} label='Select chain' />
        </div>
        <div className='mb-5'>
          <LabelText>Token Contract</LabelText>
          <CustomInput placeholder='Enter Token contract address' />
        </div>
        <div className='mb-5'>
          <LabelText>Amount of token</LabelText>
          <CustomInput placeholder='Enter token amount' />
        </div>
        <div className='mb-10'>
          <LabelText>Upload receivers wallet addresses as csv file:</LabelText>
          <FileUploader
            label='Upload an image'
            children={
              <div className='w-full h-[30px] border-dashed border-2 border-gray-400 flex justify-center items-center rounded-md'>
                <p>Upload CSV file</p>
              </div>
            }
          />
        </div>
        <p className='text-gray-600 text-center mb-2 text-[11px]'>
          Note: all tokens allocated for airdropped will be distributed equally
          to these addresses
        </p>
        <div className='flex justify-center'>
          <GradientButton className='rounded-lg px-8'>AIRDROP</GradientButton>
        </div>
      </div>
    </div>
  )
}
export default CreateAirdrop
