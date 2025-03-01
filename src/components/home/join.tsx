import { Link } from "react-router-dom";
import ContainerSmall from "../ui/container-small";
import { IconBrandDiscord, IconBrandLinkedin, IconBrandTelegram, IconBrandTwitter } from "@tabler/icons-react";

export default function Join() {
    return (
        <div className="relative">
            <div className="h-[2vw] relative">
                <div className="w-[91.4vw] lg:w-[96vw] h-[1px] bg-borderColor mx-auto" />
                <div className="hidden lg:block absolute top-[-0.414vw] left-[1vw] -translate-x-1/2 w-[1px] h-[2.828vw] bg-borderColor rotate-45" />
                <div className="hidden lg:block absolute top-[-0.414vw] right-[1vw] translate-x-1/2 w-[1px] h-[2.828vw] bg-borderColor -rotate-45" />
            </div>
            <div className="pt-6 px-[2.2vw] lg-max:px-[4.3vw]">
                <div className="md:flex md:justify-center">
                    <div>
                        <div className="flex gap-6 items-center mb-6">
                            <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/646201707951b1100b67ddfd_double-dots.svg" loading="lazy" alt="Robot Eyes" className="h-[4px]" />
                            <p className="text-lg">JOIN THE</p>
                        </div>
                        <div className="block md:flex gap-4">
                            <div className="relative">
                                <h2 className="leading-[1.2]">Decentralized</h2>
                            </div>
                            <div className="relative">
                                <h2 className="pl-3 leading-[1.2]">Revolution</h2>
                                <div className="absolute top-1/2 -translate-y-1/2 left-0">
                                    <svg className="svg-stroke-right" width="250" height="96" viewBox="0 0 411 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path className="path-anim path-anim-2 path-anim-delay-1-1" d="M263.5 94H18.7426C17.947 94 17.1839 93.6839 16.6213 93.1213L2 78.5" stroke="url(#paint0_linear_2353_8412)" strokeWidth="1.5" strokeLinecap="round"></path>
                                        <path className="path-anim path-anim-1 path-anim-delay-95" d="M409 77V19.2426C409 18.447 408.684 17.6839 408.121 17.1213L393.879 2.87868C393.316 2.31607 392.553 2 391.757 2H4" stroke="url(#paint1_linear_2353_8412)" strokeWidth="1.5" strokeLinecap="round"></path>
                                        <defs>
                                            <linearGradient id="paint0_linear_2353_8412" x1="353.5" y1="101" x2="-7.5" y2="75" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#F8CF3E"></stop>
                                                <stop offset="1" stopColor="#FC6756"></stop>
                                                <stop offset="1" stopColor="#FC6756"></stop>
                                            </linearGradient>
                                            <linearGradient id="paint1_linear_2353_8412" x1="-6.49989" y1="-9.50001" x2="384.234" y2="-140.863" gradientUnits="userSpaceOnUse">
                                                <stop offset="0.236372" stopColor="#724CE8"></stop>
                                                <stop offset="1" stopColor="#26F4D0"></stop>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <div className="hero-bottom-line"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:flex pt-14">
                    <div className="inline-block p-6 border-t border-r lg:w-[14.8vw] lg:h-min lg:p-8 xl:p-10 2xl:p-12 lg:border-y lg:border-l lg:border-r-0 border-borderColor text-white text-xl">
                        Live on X:
                    </div>
                    <div className="w-[91.6vw] lg:w-[66vw] border border-borderColor overflow-hidden bg-bgColor z-10 whitespace-nowrap">
                        <div className="sm:flex">
                            <div className="w-full p-6 sm:border-r sm:border-b-0 border-borderColor border-b flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="flex items-center">
                                            <div className="p-1 relative mr-2">
                                                <img src="/favicon.png" loading="lazy" width="56" alt="BNB Chain" />
                                                <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/644fa7cd9bc7d5ed92d90f21_corner-top-left.svg" alt="" className="absolute top-0 left-0" />
                                                <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/644fa7cd9bc7d5ed92d90f21_corner-top-left.svg" alt="" className="absolute bottom-0 right-0 rotate-180" />
                                            </div>
                                            <div>
                                                <p className="text-white text-lg flex items-center">
                                                    WHITE HAT DAO
                                                    <img src="/assets/images/verified-check.png" className="ml-1" width={18} alt="" />
                                                </p>
                                                <p className="text-lg text-gray-600">@White_Hat_DAO</p>
                                            </div>
                                        </div>
                                        <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/65253abefb080a7f70032ab6_twitter-x.svg" loading="lazy" width="24" height="24" alt="Twitter X Logo" className="mt-4" />
                                    </div>
                                    <div className="mb-16">
                                        <p className="mb-4 text-wrap">We provide a safety scroe for projects based on various factors, such as code security and potential risks and vulnerabilities. This rating can be helpful for users when evaluating the trustworthiness of a project.</p>
                                        <p className="text-wrap">#WHD #WhiteHatDAO $WHDT #Web3 #safety</p>
                                    </div>
                                </div>
                                <Link to='https://x.com/Hydra_Pad' className="block text-wrap border border-borderColorThick text-center p-3">
                                    Follow us on Twitter for more updates
                                </Link>
                            </div>
                            <div className="w-full p-6 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="flex items-center">
                                            <div className="p-1 relative mr-2">
                                                <img src="/favicon.png" loading="lazy" width="56" alt="BNB Chain" />
                                                <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/644fa7cd9bc7d5ed92d90f21_corner-top-left.svg" alt="" className="absolute top-0 left-0" />
                                                <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/644fa7cd9bc7d5ed92d90f21_corner-top-left.svg" alt="" className="absolute bottom-0 right-0 rotate-180" />
                                            </div>
                                            <div>
                                                <p className="text-white text-lg flex items-center">
                                                    WHITE HAT DAO
                                                    <img src="/assets/images/verified-check.png" className="ml-1" width={18} alt="" />
                                                </p>
                                                <p className="text-lg text-gray-600">@White_Hat_DAO</p>
                                            </div>
                                        </div>
                                        <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/65253abefb080a7f70032ab6_twitter-x.svg" loading="lazy" width="24" height="24" alt="Twitter X Logo" className="mt-4" />
                                    </div>
                                    <div className="mb-4">
                                        <iframe
                                            src="https://www.youtube.com/embed/L2ZAQi_HK_I"
                                            title="White Hat DAO Youtube Video"
                                            allow="accelerometer;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
                                            className="w-full h-full"
                                            allowFullScreen
                                        />
                                    </div>
                                </div>
                                <Link to='https://x.com/Hydra_Pad' className="block text-wrap border border-borderColorThick text-center p-3">
                                    Follow us on Twitter for more updates
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <ContainerSmall>
                    <div className="flex flex-wrap relative">
                        <div className="w-[45.7vw] lg:w-[33vw] px-8 border-b border-borderColor py-24">
                            <p className="opacity-60 mb-4">JOIN OUR</p>
                            <Link to='https://x.com/Hydra_Pad' target="_blank" className="text-3xl flex items-center hover:opacity-60 duration-200">

                                <IconBrandTwitter className="w-10 h-10" />
                            </Link>
                        </div>
                        <div className="w-[45.7vw] lg:w-[33vw] px-8 border-b border-borderColor py-24 text-right">
                            <p className="opacity-60 mb-4">HOP INTO</p>
                            <Link to='http://discord.gg/ESnjKeeRbE' target="_blank" className="text-3xl flex items-center justify-end hover:opacity-60 duration-200">
                                <IconBrandDiscord className="w-10 h-10" />
                            </Link>
                        </div>
                        <div className="w-[45.7vw] lg:w-[33vw] px-8 py-24">
                            <p className="opacity-60 mb-4">JOIN OUR</p>
                            <Link to='https://www.linkedin.com/company/whitehatdao' target="_blank" className="text-3xl flex items-center hover:opacity-60 duration-200">
                                <IconBrandLinkedin className="w-10 h-10" />
                            </Link>
                        </div>
                        <div className="w-[45.7vw] lg:w-[33vw] px-8 py-24 text-right">
                            <p className="opacity-60 mb-4">HOP INTO</p>
                            <Link to='http://t.me/hydra_pad' target="_blank" className="text-3xl flex items-center justify-end hover:opacity-60 duration-200">
                                <IconBrandTelegram className="w-10 h-10" />
                            </Link>
                        </div>
                        <img src="/assets/images/what_shield.png" alt="logo" className="absolute w-[14%] xl:w-[8%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                </ContainerSmall>
            </div>
        </div>
    )
}
