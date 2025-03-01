import { Link } from "react-router-dom";
import ContainerSmall from "../ui/container-small";
import Slider from "../ui/slider";

const content = [
    <div className="w-[91.4vw] sm:w-[45.7vw] lg:w-[33vw] p-4 text-center md:text-left h-full">
        <div className="rounded border border-borderColor p-4 h-full flex flex-col justify-between">
            <div className="block md:flex mb-4">
                <div className="flex justify-center md:block md:mr-4 mb-4">
                    <img src="/assets/images/members/matt_lopez.png" alt="" className="w-48 rounded border border-borderColor p-2" />
                </div>
                <div className="h-full grid items-stretch">
                    <h5 className="mb-2 md:mb-4">Matt Lopez</h5>
                    <div className="mb-2 md:mb-4 text-lg">
                        <p>DAO Governer</p>
                        <p>[ Elective ]</p>
                    </div>
                    <div className="text-lg">
                        <p>Member of Elder Council</p>
                        <p>[ Selective ]</p>
                    </div>
                </div>
            </div>
            <div className="rounded border border-borderColor p-4">
                "Flectere si nequeo superos, Acheronta movebo."
            </div>
        </div>
    </div>,
    <div className="w-[91.4vw] sm:w-[45.7vw] lg:w-[33vw] p-4 text-center md:text-left h-full">
        <div className="rounded border border-borderColor p-4 h-full flex flex-col justify-between">
            <div className="block md:flex mb-4">
                <div className="flex justify-center md:block md:mr-4 mb-4">
                    <img src="/assets/images/members/lelouch_x.png" alt="" className="w-48 rounded border border-borderColor p-2" />
                </div>
                <div className="h-full grid items-stretch">
                    <h5 className="mb-2 md:mb-4">Lelouch X</h5>
                    <div className="mb-2 md:mb-4 text-lg">
                        <p>DAO Governer</p>
                        <p>[ Elective ]</p>
                    </div>
                    <div className="text-lg">
                        <p>Office of Augustus</p>
                        <p>[ Selective ]</p>
                    </div>
                </div>
            </div>
            <div className="rounded border border-borderColor p-4">
                “We are Decentralized ! So long our ideas converges towards the same path of standing together for common benefit”
            </div>
        </div>
    </div>,
    <div className="w-[91.4vw] sm:w-[45.7vw] lg:w-[33vw] p-4 text-center md:text-left h-full">
        <div className="rounded border border-borderColor p-4 h-full flex flex-col justify-between">
            <div className="block md:flex mb-4">
                <div className="flex justify-center md:block md:mr-4 mb-4">
                    <img src="/assets/images/members/itsuki_minomoto.png" alt="" className="w-48 rounded border border-borderColor p-2" />
                </div>
                <div className="h-full grid items-stretch">
                    <h5 className="mb-2 md:mb-4">Itsuki Minomoto</h5>
                    <div className="mb-2 md:mb-4 text-lg">
                        <p>Member of DAO Senate</p>
                        <p>[ Elective ]</p>
                    </div>
                    <div className="text-lg">
                        <p>Member of Elder Council</p>
                        <p>[ Selective ]</p>
                    </div>
                </div>
            </div>
            <div className="rounded border border-borderColor p-4">
                “Invest for the long haul. Don't get too greedy and don't get too scared”
            </div>
        </div>
    </div>,
    <div className="w-[91.4vw] sm:w-[45.7vw] lg:w-[33vw] p-4 text-center md:text-left h-full">
        <div className="rounded border border-borderColor p-4 h-full flex flex-col justify-between">
            <div className="block md:flex mb-4">
                <div className="flex justify-center md:block md:mr-4 mb-4">
                    <img src="/assets/images/members/Boss.png" alt="" className="w-48 rounded border border-borderColor p-2" />
                </div>
                <div className="h-full grid items-stretch">
                    <h5 className="mb-2 md:mb-4">Oleksandr Makovoz</h5>
                    <div className="mb-2 md:mb-4 text-lg">
                        <p>Member of DAO Senate</p>
                        <p>[ Elective ]</p>
                    </div>
                    <div className="text-lg">
                        <p>Member of Elder Council</p>
                        <p>[ Selective ]</p>
                    </div>
                </div>
            </div>
            <div className="rounded border border-borderColor p-4">
                “The greatest glory in living lies not in never falling, but in rising every time we fall.”
            </div>
        </div>
    </div>,
    <div className="w-[91.4vw] sm:w-[45.7vw] lg:w-[33vw] p-4 text-center md:text-left h-full">
        <div className="rounded border border-borderColor p-4 h-full flex flex-col justify-between">
            <div className="block md:flex mb-4">
                <div className="flex justify-center md:block md:mr-4 mb-4">
                    <img src="/assets/images/members/angela.png" alt="" className="w-48 rounded border border-borderColor p-2" />
                </div>
                <div className="h-full grid items-stretch">
                    <h5 className="mb-2 md:mb-4">Angela Steffens</h5>
                    <div className="mb-2 md:mb-4 text-lg">
                        <p>Member of DAO Senate</p>
                        <p>[ Elective ]</p>
                    </div>
                    <div className="text-lg">
                        <p>Member of Elder Council</p>
                        <p>[ Selective ]</p>
                    </div>
                </div>
            </div>
            <div className="rounded border border-borderColor p-4">
                “Lets keep working for innovation & decentralization. We will get there.”
            </div>
        </div>
    </div>,
    <div className="w-[91.4vw] sm:w-[45.7vw] lg:w-[33vw] p-4 text-center md:text-left h-full">
        <div className="rounded border border-borderColor p-4 h-full flex flex-col justify-between">
            <div className="block md:flex mb-4">
                <div className="flex justify-center md:block md:mr-4 mb-4">
                    <img src="/assets/images/members/sachin.png" alt="" className="w-48 rounded border border-borderColor p-2" />
                </div>
                <div className="h-full grid items-stretch">
                    <h5 className="mb-2 md:mb-4">Sachin Rana</h5>
                    <div className="mb-2 md:mb-4 text-lg">
                        <p>DAO Governor</p>
                        <p>[ Elective ]</p>
                    </div>
                    <div className="text-lg">
                        <p>Member of Elder Council</p>
                        <p>[ Selective ]</p>
                    </div>
                </div>
            </div>
            <div className="rounded border border-borderColor p-4">
                “Blockchain Innovation keeps us moving towards the future finance.”
            </div>
        </div>
    </div>,
    <div className="w-[91.4vw] sm:w-[45.7vw] lg:w-[33vw] p-4 text-center md:text-left h-full">
        <div className="rounded border border-borderColor p-4 h-full flex flex-col justify-between">
            <div className="block md:flex mb-4">
                <div className="flex justify-center md:block md:mr-4 mb-4">
                    <img src="/assets/images/members/shekhar.jpg" alt="" className="w-48 rounded border border-borderColor p-2" />
                </div>
                <div className="h-full grid items-stretch">
                    <h5 className="mb-2 md:mb-4">Shekhar Shah</h5>
                    <div className="mb-2 md:mb-4 text-lg">
                        <p>DAO Governor</p>
                        <p>[ Elective ]</p>
                    </div>
                    <div className="text-lg">
                        <p>Member of Elder Council</p>
                        <p>[ Selective ]</p>
                    </div>
                </div>
            </div>
            <div className="rounded border border-borderColor p-4">
                “THE REASON WE’RE ALL HERE IS THAT CURRENT FINANCIAL SYSTEM IS OUTDATED.”
            </div>
        </div>
    </div>,
]

export default function Team() {
    return (
        <div className="pt-[80px] px-[2.2vw] lg-max:px-[4.3vw]">
            <div className="pb-8">
                <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/646201707951b1100b67ddfd_double-dots.svg" loading="lazy" alt="Robot Eyes" className="h-[4px] ml-2 mb-10" />
                <div className="flex text-white">
                    <div>
                        <h2>
                            <span className="relative">
                                <h2 className="px-4 py-2 mr-3 inline-block">DAO</h2>
                                <span className="absolute top-1/2 -translate-y-1/2 left-0">
                                    <svg viewBox="0 0 130 66" fill="none" xmlns="http://www.w3.org/2000/svg" width="130">
                                        <path className="path-anim path-anim-1" d="M2 64V15L15 2H128V50L114 64H2" stroke="rgb(200, 200, 200)" strokeWidth="1" strokeLinecap="round"></path>
                                        <defs>
                                            <linearGradient id="paint1_linear_2309_6568" x1="416.5" y1="-9.50001" x2="25.7657" y2="-140.863" gradientUnits="userSpaceOnUse">
                                                <stop offset="0.236372" stopColor="#724CE8"></stop>
                                                <stop offset="1" stopColor="#26F4D0"></stop>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </span>
                            </span>
                            <span className="sm:inline block">Governing</span>
                        </h2>
                        <h2>Members</h2>
                    </div>
                </div>
                <ContainerSmall className="flex items-center mt-4">
                    <div className="w-full flex justify-center">
                        <Link to='#' className="w-5/6 md:w-2/3 h-20 text-xl text-white flex justify-center items-center relative">
                            DAO members count 167
                            <img
                                src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/644fa7ccf9e72f37ae5162ad_corner-bottom-right.svg"
                                alt=""
                                className="absolute top-0 left-0 rotate-180"
                            />
                            <img
                                src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/644fa7ccf9e72f37ae5162ad_corner-bottom-right.svg"
                                alt=""
                                className="absolute top-0 right-0 -rotate-90"
                            />
                            <img
                                src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/644fa7ccf9e72f37ae5162ad_corner-bottom-right.svg"
                                alt=""
                                className="absolute bottom-0 right-0"
                            />
                            <img
                                src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/644fa7ccf9e72f37ae5162ad_corner-bottom-right.svg"
                                alt=""
                                className="absolute bottom-0 left-0 rotate-90"
                            />
                        </Link>
                    </div>
                    <div className="w-full sm:flex hidden justify-center">
                        <Link to='#' className="w-5/6 md:w-2/3 h-20 text-xl text-white flex justify-center items-center opacity-60 hover:opacity-100 duration-150">
                            Join our Community to learn more about our members, partners & advisors
                        </Link>
                    </div>
                </ContainerSmall>
            </div>
            <div className="w-[95.7vw] lg:w-[83vw] lg:ml-[14.8vw] bg-bgColor sm:bg-transparent relative overflow-hidden border-y border-borderColor">
                <Slider content={content} duration={5000} />
            </div>
        </div>
    )
}
