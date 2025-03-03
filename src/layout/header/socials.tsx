import { IconBrandDiscord, IconBrandLinkedin, IconBrandTelegram, IconBrandTwitter } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function Socials() {
    return (
        <div className="relative group/whole">
            <div className="py-8 flex items-center gap-2 cursor-pointer group/item relative">
                Socials
                <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/64491fa5649dfb767a0c35ee_arrow-down.svg" alt="" />
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white group-hover/item:w-full duration-300 z-10" />
            </div>
            <div className="absolute top-full -right-5 hidden group-hover/whole:flex border border-borderColor bg-bgColor">
                <div className="border-r border-borderColor w-max">
                    <div className="w-max p-6 opacity-opacity1">
                        JOIN THE COMMUNITY
                    </div>
                    <Link to="https://x.com/Hydra_Pad" target="_blank" className="px-5 py-3 border-t border-borderColor flex justify-between items-center hover:opacity-70 duration-200">
                        <div className="flex items-center gap-4 mr-14 w-max">
                            <IconBrandTwitter className="w-9 h-9" />
                            <p className="text-white">Twitter</p>
                        </div>
                        <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/64491f577f22d780663c25d1_ico-arrow.svg" className="w-3 h-3" alt="" />
                    </Link>
                    <Link to="http://discord.gg/ESnjKeeRbE" target="_blank" className="px-5 py-3 border-t border-borderColor flex justify-between items-center hover:opacity-70 duration-200">
                        <div className="flex items-center gap-4 mr-14 w-max">
                            <IconBrandDiscord className="w-9 h-9" />
                            <p className="text-white">Discord</p>
                        </div>
                        <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/64491f577f22d780663c25d1_ico-arrow.svg" className="w-3 h-3" alt="" />
                    </Link>
                    <Link to="http://t.me/hydra_pad" target="_blank" className="px-5 py-3 border-t border-borderColor flex justify-between items-center hover:opacity-70 duration-200">
                        <div className="flex items-center gap-4 mr-14 w-max">
                            <IconBrandTelegram className="w-9 h-9" />
                            <p className="text-white">Telegram</p>
                        </div>
                        <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/64491f577f22d780663c25d1_ico-arrow.svg" className="w-3 h-3" alt="" />
                    </Link>
                    <Link to="https://www.linkedin.com/company/whitehatdao" target="_blank" className="px-5 py-3 border-t border-borderColor flex justify-between items-center hover:opacity-70 duration-200">
                        <div className="flex items-center gap-4 mr-14 w-max">
                            <IconBrandLinkedin className="w-9 h-9" />
                            <p className="text-white">Linkedin</p>
                        </div>
                        <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/64491f577f22d780663c25d1_ico-arrow.svg" className="w-3 h-3" alt="" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
