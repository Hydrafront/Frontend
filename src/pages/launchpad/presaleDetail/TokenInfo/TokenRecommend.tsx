import BorderBox from "@/components/common/BorderBox"

const TokenRecommend = () => {
  return (
    <div className="flex gap-2">
        <BorderBox className="w-1/4 flex flex-col justify-center items-center gap-1">
            <img src="/assets/images/logo.png" alt="missile-icon" className="w-[20px]" />
            <span className="text-center text-white">23</span>
        </BorderBox>
        <BorderBox className="w-1/4 flex flex-col justify-center items-center gap-1">
            <img src="/assets/images/logo.png" alt="missile-icon" className="w-[20px]" />
            <span className="text-center text-white">23</span>
        </BorderBox>
        <BorderBox className="w-1/4 flex flex-col justify-center items-center gap-1">
            <img src="/assets/images/logo.png" alt="missile-icon" className="w-[20px]" />
            <span className="text-center text-white">23</span>
        </BorderBox>
        <BorderBox className="w-1/4 flex flex-col justify-center items-center gap-1">
            <img src="/assets/images/logo.png" alt="missile-icon" className="w-[20px]" />
            <span className="text-center text-white">23</span>
        </BorderBox>
    </div>
  )
}

export default TokenRecommend
