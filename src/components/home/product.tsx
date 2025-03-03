import Slider from "../ui/slider";

const content = [
    <div className="w-[91.4vw] md:w-[45.7vw] lg:w-[33vw] border border-white flex text-xl bg-bgColor z-10">
        <div className="w-[80px] h-[78px] flex justify-center items-center border-r border-white">01</div>
        <div className="w-[calc(100%-80px)] h-[78px] flex justify-center items-center">Decentralized Governance</div>
    </div>,
    <div className="w-[91.4vw] md:w-[45.7vw] lg:w-[33vw] border border-white flex text-xl bg-bgColor z-10">
        <div className="w-[80px] h-[78px] flex justify-center items-center border-r border-white">02</div>
        <div className="w-[calc(100%-80px)] h-[78px] flex justify-center items-center">Safety Rating</div>
    </div>,
    <div className="w-[91.4vw] md:w-[45.7vw] lg:w-[33vw] border border-white flex text-xl bg-bgColor z-10">
        <div className="w-[80px] h-[78px] flex justify-center items-center border-r border-white">03</div>
        <div className="w-[calc(100%-80px)] h-[78px] flex justify-center items-center">Decentralized Launchpad</div>
    </div>,
    <div className="w-[91.4vw] md:w-[45.7vw] lg:w-[33vw] border border-white flex text-xl bg-bgColor z-10">
        <div className="w-[80px] h-[78px] flex justify-center items-center border-r border-white">04</div>
        <div className="w-[calc(100%-80px)] h-[78px] flex justify-center items-center">Development & Growth</div>
    </div>,
    <div className="w-[91.4vw] md:w-[45.7vw] lg:w-[33vw] border border-white flex text-xl bg-bgColor z-10">
        <div className="w-[80px] h-[78px] flex justify-center items-center border-r border-white">05</div>
        <div className="w-[calc(100%-80px)] h-[78px] flex justify-center items-center">Building Partnership & Cooperation</div>
    </div>,
    <div className="w-[91.4vw] md:w-[45.7vw] lg:w-[33vw] border border-white flex text-xl bg-bgColor z-10">
        <div className="w-[80px] h-[78px] flex justify-center items-center border-r border-white">06</div>
        <div className="w-[calc(100%-80px)] h-[78px] flex justify-center items-center">Decentralized Exchange</div>
    </div>,
    <div className="w-[91.4vw] md:w-[45.7vw] lg:w-[33vw] border border-white flex text-xl bg-bgColor z-10">
        <div className="w-[80px] h-[78px] flex justify-center items-center border-r border-white">07</div>
        <div className="w-[calc(100%-80px)] h-[78px] flex justify-center items-center">NFT Marketplace</div>
    </div>,
]

export default function Product() {
    return (
        <div className="pt-4">
            <div className="flex h-[80px]">
                <div className="w-[4.3vw] lg:w-[17vw] h-full bg-[#0a090f] z-10 relative" />
                <div className="w-[91.4vw] md:w-[45.7vw] lg:w-[33vw] flex relative">
                    <Slider content={content} duration={5000} />
                    <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/643550c922d6d34b8dffd28d_corner.svg" loading="lazy" alt="" className="sm:block hidden absolute bottom-full right-full translate-x-[-7px]" />
                    <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/643550c922d6d34b8dffd28d_corner.svg" loading="lazy" alt="" className="sm:block hidden absolute bottom-full left-full translate-x-[7px] rotate-90" />
                    <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/643550c922d6d34b8dffd28d_corner.svg" loading="lazy" alt="" className="sm:block hidden absolute top-full left-full translate-x-[7px] rotate-180" />
                    <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/643550c922d6d34b8dffd28d_corner.svg" loading="lazy" alt="" className="sm:block hidden absolute top-full right-full translate-x-[-7px] -rotate-90" />
                </div>
                <div className="md:w-[50vw] w-[4.3vw] h-full bg-[#0a090faa] z-10 relative" />
            </div>
        </div>
    )
}
