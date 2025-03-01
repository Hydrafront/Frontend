import TwitterSvg from "../icons/twitter-svg";
import TelegramSvg from "../icons/Telegram-svg";
import RedditSvg from "../icons/Discord-svg";
// import WhatsAppSvg from "../icons/Whatsapp-svg";
import CopySvg from "../icons/Copy-svg";
import { linkOtherSite } from "@/utils/func";

interface PropsType {
  name: string;
  symbol: string
}

const PreviewBox: React.FC<PropsType> = ({name, symbol}) => {
  return (
    <div className="p-2 bg-lighterColor rounded-lg">
      <div className="flex justify-between items-center p-2 bg-lightestColor rounded-lg">
        <div className="flex items-center">
          <div className="w-[51px] h-[51px] bg-[#3A6024] rounded-full mr-3"></div>
          <div>
            <p className="text-blue-700">{name}</p>
            <p>{symbol}</p>
          </div>
        </div>
        <div className="flex items-center">
          <TwitterSvg className="mx-1 cursor-pointer hover:opacity-80" onClick={() => linkOtherSite("#")} />
          <TelegramSvg className="mx-1 cursor-pointer hover:opacity-80" onClick={() => linkOtherSite("#")} />
          <RedditSvg className="mx-1 cursor-pointer hover:opacity-80" onClick={() => linkOtherSite("#")} />
          {/* <WhatsAppSvg className="mx-1 cursor-pointer hover:opacity-80" onClick={() => linkOtherSite("#")} /> */}
          <CopySvg className="mx-1 cursor-pointer hover:opacity-80" onClick={() => linkOtherSite("#")} />
        </div>
      </div>
    </div>
  )
}
export default PreviewBox;