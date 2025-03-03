import CountdownTimer from "@/components/ui/CountdownTimer";
import RedditSvg from "@/components/icons/Discord-svg";
import GlobalSvg from "@/components/icons/Global-svg";
import TelegramSvg from "@/components/icons/Telegram-svg";
import TwitterSvg from "@/components/icons/twitter-svg";
import { Link } from "react-router-dom";

interface LeftSidebarProps {
  isRegular?: string | undefined;
}

const LeftSidebar: React.FC<LeftSidebarProps> = () => {
  return (
    <div className="border-2 border-borderColor relative">
      <h5 className="bg-[#222227] p-3 text-center">dogwifhat</h5>
      <div className="px-3 flex flex-col items-center w-full xl:w-[17vw]">
        <img
          src="/assets/images/avatars/dog.jpg"
          alt="avatar"
          className="w-[185px] h-[180px] my-5"
        />
        <div className="flex">
          <Link to="https://x.com/Hydra_Pad" target="_blank">
            <TwitterSvg className=" w-7 h-7 cursor-pointer hover:opacity-80 duration-150 mx-1" />
          </Link>
          <Link to="http://t.me/hydra_pad" target="_blank">
            <TelegramSvg className=" w-7 h-7 cursor-pointer hover:opacity-80 duration-150 mx-1" />
          </Link>
          <Link to="http://discord.gg/ESnjKeeRbE" target="_blank">
            <RedditSvg className=" w-7 h-7 cursor-pointer hover:opacity-80 duration-150 mx-1" />
          </Link>
          <GlobalSvg className=" w-7 h-7 cursor-pointer hover:opacity-80 duration-150 mx-1" />
        </div>
        {/* <Button className='bg-[#475DC0] px-16' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Promote</Button> */}
        <div className="flex items-center mt-6 mb-6 xl:mb-10">
          <span className="text-gray-700">Chain:</span>
          <img
            src="/assets/images/chains/Polygon.png"
            alt="Polygon icon"
            className="w-6 ml-1 mr-2"
          />
          <span className="text-[18px]">Polygon</span>
        </div>
        <p className="mb-2">Presale Time Duration</p>
        <div className="w-full pb-4 xl:pb-0">
          <CountdownTimer />
          <div className="flex justify-center">
            <span className="mx-4">DAY</span>
            <span className="mx-4">HR</span>
            <span className="mx-4">MIN</span>
            <span className="mx-4">SEC</span>
          </div>
        </div>
        {/* <div
          className="my-4 rounded-lg p-4"
          style={{
            backgroundImage:
              "radial-gradient(100% 110% at 50% 0%, #202F27 10%, #000000 90%)",
          }}
        >
          <p className="text-[13px] text-center">
            Dogwifhat is a memecoin based on a popular meme of a Shiba Inu puppy
            wearing a pink beanie. It's a relative newcomer to the memecoin
            segment, having launched in late 2023, but has seen remarkably rapid
            growth thanks to an engaged community.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default LeftSidebar;
