// import { IconBrandDiscord, IconBrandLinkedin, IconBrandTelegram, IconBrandTwitter } from "@tabler/icons-react";
import { Link } from "react-router-dom";


interface PropsType {
    setClicked: (value: boolean) => void;
}

export default function MobileView(props: PropsType) {

    return (
        <div className="absolute top-full z-[99999] bg-bgColor w-full h-screen px-[4.3vw] py-4">
            <div className="group/whole relative">
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#FC6856] via-[#6DE79D] to-[#724EE8]" />
                <div className="py-4 relative flex items-center justify-between group/item cursor-pointer">
                    <div className="flex items-center">
                        <div className="w-3 h-3 mr-3 relative group-hover/item:rotate-45 group-hover/item:scale-[1.667] duration-200">
                            <div className="w-1 h-1 bg-white rounded-full absolute top-0 left-0 group-hover/item:scale-[0.6] duration-200" />
                            <div className="w-1 h-1 bg-white rounded-full absolute top-0 right-0 group-hover/item:scale-[0.6] duration-200" />
                            <div className="w-1 h-1 bg-white rounded-full absolute bottom-0 right-0 group-hover/item:scale-[0.6] duration-200" />
                            <div className="w-1 h-1 bg-white rounded-full absolute bottom-0 left-0 group-hover/item:scale-[0.6] duration-200" />
                        </div>
                        Resource
                    </div>
                    <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/64491fa5649dfb767a0c35ee_arrow-down.svg" loading="lazy" alt="" className="mr-4 group-hover/item:rotate-180 w-2" />
                </div>
                <div className="flex-wrap hidden group-hover/whole:flex">
                    <Link rel="noopener noreferrer" to="#" className="inline-block mr-2 p-2 cst-link-item-bg mb-3 opacity-60 hover:opacity-100 duration-150" >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center mr-3">
                                <img src="/assets/images/HYD.png" alt="" className="mr-1" width={32} height={32} />
                                <p>
                                    User Guide
                                </p>
                            </div>
                            <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/645e3d7ca7fd751544d4e7e8_icon-link-arrow-simple.svg" loading="lazy" alt="Simple Link Arrow Icon" className="w-3" />
                        </div>
                    </Link>
                    <Link rel="noopener noreferrer" to="/" className="inline-block mr-2 p-2 cst-link-item-bg mb-3 opacity-60 hover:opacity-100 duration-150" >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center mr-3">
                                <img src="/assets/images/HYD.png" alt="" className="mr-1" width={32} height={32} />
                                <p>
                                    Doc
                                </p>
                            </div>
                            <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/645e3d7ca7fd751544d4e7e8_icon-link-arrow-simple.svg" loading="lazy" alt="Simple Link Arrow Icon" className="w-3" />
                        </div>
                    </Link>
                    <Link rel="noopener noreferrer" to="/launchpad" className="inline-block mr-2 p-2 cst-link-item-bg mb-3 opacity-60 hover:opacity-100 duration-150" onClick={() => props.setClicked(false)}>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center mr-3">
                                <img src="/assets/images/HYD.png" alt="" className="mr-1" width={32} height={32} />
                                <p>
                                    Advert & KOL
                                </p>
                            </div>
                        </div>
                        <p className="pl-8 text-[10px]">Hire us to Promote</p>
                    </Link>
                    <Link rel="noopener noreferrer" to="/" className="inline-block mr-2 p-2 cst-link-item-bg mb-3 opacity-60 hover:opacity-100 duration-150" >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center mr-3">
                                <img src="/assets/images/HYD.png" alt="" className="mr-1" width={32} height={32} />
                                <p>
                                    Partnership
                                </p>
                            </div>
                            <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/645e3d7ca7fd751544d4e7e8_icon-link-arrow-simple.svg" loading="lazy" alt="Simple Link Arrow Icon" className="w-3" />
                        </div>
                    </Link>
                    {/* <Link rel="noopener noreferrer" to="/" className="inline-block mr-2 p-2 cst-link-item-bg mb-3 opacity-60 hover:opacity-100 duration-150" >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center mr-3">
                                <img src="/assets/images/HYD.png" alt="" className="mr-1" width={32} height={32} />
                                <p>
                                    Gov Token
                                </p>
                            </div>
                            <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/645e3d7ca7fd751544d4e7e8_icon-link-arrow-simple.svg" loading="lazy" alt="Simple Link Arrow Icon" className="w-3" />
                        </div>
                        <p className="text-[11.7px]">Coming Soon</p>
                    </Link>
                    <Link rel="noopener noreferrer" to="/" className="inline-block mr-2 p-2 cst-link-item-bg mb-3 opacity-60 hover:opacity-100 duration-150" >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center mr-3">
                                <img src="/assets/images/HYD.png" alt="" className="mr-1" width={32} height={32} />
                                <p>
                                    Active DAO Proposals
                                </p>
                            </div>
                            <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/645e3d7ca7fd751544d4e7e8_icon-link-arrow-simple.svg" loading="lazy" alt="Simple Link Arrow Icon" className="w-3" />
                        </div>
                        <p className="text-[11.7px]">Coming Soon</p>
                    </Link> */}
                </div>
            </div>
            {/* <div className="relative group/whole border-b border-borderColor hover:border-b-0">
                <div className="py-4 flex justify-between items-center gap-2 cursor-pointer group/item relative">
                    DAO-Governance
                    <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/64491fa5649dfb767a0c35ee_arrow-down.svg" alt="" className="mr-4 group-hover/item:rotate-180 w-2" />
                </div>
                <div className="hidden group-hover/whole:md:flex group-hover/whole:block border border-borderColor">
                    <div className="md:border-r border-borderColor md:w-max w-full border-b">
                        <div className="w-max p-4 opacity-opacity1">
                            JOIN THE DAO GOVERNANCE
                        </div>
                        <Link to="#" className="px-5 py-2 border-t border-borderColor flex justify-between items-center hover:opacity-70 duration-200">
                            <div className="flex items-center gap-4 mr-14 w-max">
                                <img src="/assets/images/dao_gov.webp" className="w-8 lg:w-10 xl:w-12 2xl:w-14" alt="" />
                                <p className="text-white">DAO Gov</p>
                            </div>
                            <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/64491f577f22d780663c25d1_ico-arrow.svg" className="w-3 h-3" alt="" />
                        </Link>
                        <Link to="#" className="px-5 py-2 border-t border-borderColor flex justify-between items-center hover:opacity-70 duration-200">
                            <div className="flex items-center gap-4 mr-14 w-max">
                                <img src="/assets/images/dao_senate.webp" className="w-8 lg:w-10 xl:w-12 2xl:w-14" alt="" />
                                <p className="text-white">DAO Senate</p>
                            </div>
                            <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/64491f577f22d780663c25d1_ico-arrow.svg" className="w-3 h-3" alt="" />
                        </Link>
                        <Link to="#" className="px-5 py-2 border-t border-borderColor flex justify-between items-center hover:opacity-70 duration-200">
                            <div className="flex items-center gap-4 mr-14 w-max">
                                <img src="/assets/images/elder_council.webp" className="w-8 lg:w-10 xl:w-12 2xl:w-14" alt="" />
                                <p className="text-white">Elder Council</p>
                            </div>
                            <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/64491f577f22d780663c25d1_ico-arrow.svg" className="w-3 h-3" alt="" />
                        </Link>
                        <Link to="#" className="px-5 py-2 border-t border-borderColor flex justify-between items-center hover:opacity-70 duration-200">
                            <div className="flex items-center gap-4 mr-14 w-max">
                                <img src="/assets/images/office_of_augustus.webp" className="w-8 lg:w-10 xl:w-12 2xl:w-14" alt="" />
                                <p className="text-white">Office of Augustus</p>
                            </div>
                            <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/64491f577f22d780663c25d1_ico-arrow.svg" className="w-3 h-3" alt="" />
                        </Link>
                    </div>
                    <div className="w-full">
                        <div className="w-max p-4 opacity-opacity1">
                            Active Discussions
                        </div>
                        <Link to="#" className="px-5 py-2 border-t border-borderColor flex justify-between items-center hover:opacity-70 duration-200">
                            <div className="flex items-center gap-4 mr-14 w-max">
                                <img src="/assets/images/dao_proposals.webp" className="w-8 lg:w-10 xl:w-12 2xl:w-14" alt="" />
                                <p className="text-white">DAO Proposals</p>
                            </div>
                            <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/64491f577f22d780663c25d1_ico-arrow.svg" className="w-3 h-3" alt="" />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="relative group/whole border-b border-borderColor hover:border-b-0">
                <div className="py-4 flex justify-between items-center gap-2 cursor-pointer group/item relative">
                    Safety Rating
                    <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/64491fa5649dfb767a0c35ee_arrow-down.svg" alt="" className="mr-4 group-hover/item:rotate-180 w-2" />
                </div>
                <div className="hidden group-hover/whole:block border border-borderColor bg-bgColor">
                    <div className="w-max px-6 py-4 flex justify-between items-center hover:opacity-70 duration-200">
                        <div className="flex items-center gap-4 mr-10 w-max">
                            <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/65e19a31ef2063a786b0198c_ico-grant.svg" className="w-[18px]" alt="" />
                            <p className="text-white">Coming Soon</p>
                        </div>
                    </div>
                </div>
            </div>
            <Link to="/launchpad" onClick={() => props.setClicked(false)}>
                <div className="relative group/whole border-b border-borderColor hover:border-b-0">
                    <div className="py-4 flex justify-between items-center gap-2 cursor-pointer group/item relative">
                        Launchpad
                    </div>
                </div>
            </Link>
            <div className="border-b border-borderColor">
                <div className="py-4 cursor-pointer">
                    NFT Market Place
                </div>
            </div>
            <div className="border-b border-borderColor">
                <div className="py-4 cursor-pointer">
                    Dex
                </div>
            </div>
            <div className="relative group/whole border-b border-borderColor hover:border-b-0">
                <div className="py-4 flex justify-between items-center gap-2 cursor-pointer group/item relative">
                    Socials
                    <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/64491fa5649dfb767a0c35ee_arrow-down.svg" alt="" className="mr-4 group-hover/item:rotate-180 w-2" />
                </div>
                <div className="hidden group-hover/whole:flex border border-borderColor">
                    <div className="w-full">
                        <div className="w-max p-4 opacity-opacity1">
                            JOIN THE COMMUNITY
                        </div>
                        <Link to="https://x.com/Hydra_Pad" target="_blank" className="px-5 py-3 border-t border-borderColor flex justify-between items-center hover:opacity-70 duration-200">
                            <div className="flex items-center gap-4 mr-14 w-max">
                                <IconBrandTwitter className="w-8 h-8" />
                                <p className="text-white">Twitter</p>
                            </div>
                            <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/64491f577f22d780663c25d1_ico-arrow.svg" className="w-3 h-3" alt="" />
                        </Link>
                        <Link to="http://discord.gg/ESnjKeeRbE" target="_blank" className="px-5 py-3 border-t border-borderColor flex justify-between items-center hover:opacity-70 duration-200">
                            <div className="flex items-center gap-4 mr-14 w-max">
                                <IconBrandDiscord className="w-8 h-8" />
                                <p className="text-white">Discord</p>
                            </div>
                            <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/64491f577f22d780663c25d1_ico-arrow.svg" className="w-3 h-3" alt="" />
                        </Link>
                        <Link to="http://t.me/hydra_pad" target="_blank" className="px-5 py-3 border-t border-borderColor flex justify-between items-center hover:opacity-70 duration-200">
                            <div className="flex items-center gap-4 mr-14 w-max">
                                <IconBrandTelegram className="w-8 h-8" />
                                <p className="text-white">Telegram</p>
                            </div>
                            <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/64491f577f22d780663c25d1_ico-arrow.svg" className="w-3 h-3" alt="" />
                        </Link>
                        <Link to="https://www.linkedin.com/company/whitehatdao" target="_blank" className="px-5 py-3 border-t border-borderColor flex justify-between items-center hover:opacity-70 duration-200">
                            <div className="flex items-center gap-4 mr-14 w-max">
                                <IconBrandLinkedin className="w-8 h-8" />
                                <p className="text-white">Linkedin</p>
                            </div>
                            <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/64491f577f22d780663c25d1_ico-arrow.svg" className="w-3 h-3" alt="" />
                        </Link>
                    </div>
                </div>
            </div> */}
        </div>
    )
}
