import { Link } from "react-router-dom";
import ContainerSmall from "../ui/container-small";

export default function Ecosystem() {
    return (
        <div className="pt-[114px] pb-[76px] px-[2.2vw] lg-max:px-[4.3vw]">
            <div>
                <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/646201707951b1100b67ddfd_double-dots.svg" loading="lazy" alt="Robot Eyes" className="h-[4px] ml-2 mb-10" />
                <div className="text-white">
                    <h2>
                        <span>The </span>
                        <span className="px-4 relative">
                            Ecosystem
                            <span className="absolute -top-2 left-2 w-full h-[1px] bg-borderColorThick" />
                            <span className="absolute bottom-2 -right-2 w-[1px] h-full bg-borderColorThick" />
                            <span className="absolute -bottom-2 right-2 w-full h-[1px] bg-borderColorThick" />
                            <span className="absolute top-2 -left-2 w-[1px] h-full bg-borderColorThick" />
                            <span className="absolute top-0 -translate-y-1/2 left-0 w-[1px] h-[1.414rem] rotate-45 bg-borderColorThick" />
                            <span className="absolute bottom-0 translate-y-1/2 right-0 w-[1px] h-[1.414rem] rotate-45 bg-borderColorThick" />
                        </span>
                    </h2>
                    <h2>behind ChainGPT</h2>
                </div>
            </div>
            <ContainerSmall>
                <div className="mt-16 mb-8 relative">
                    <img src="https://assets-global.website-files.com/64354b8ce4872ad8cd1c7b04/6464a2228d573b4402bfe382_chainGPT_ecosystem-no-nb.webp" loading="lazy" alt="The Ecosystem behind ChainGPT Illustration" className="w-full" />
                    <div className="absolute bottom-[37%] left-[2%] w-[3.5vw] h-[3.5vw] flex justify-center items-center text-xl text-white border border-borderColor">01</div>
                    <div className="absolute top-[22%] left-[41%] w-[3.5vw] h-[3.5vw] flex justify-center items-center text-xl text-white border border-borderColor">02</div>
                    <div className="absolute bottom-[22%] right-[41%] w-[3.5vw] h-[3.5vw] flex justify-center items-center text-xl text-white border border-borderColor">03</div>
                    <div className="absolute top-[37%] right-[2%] w-[3.5vw] h-[3.5vw] flex justify-center items-center text-xl text-white border border-borderColor">04</div>
                </div>
                <div>
                    <div className="flex border-t border-borderColor">
                        <div className="w-1/2 py-[26px] px-[3.6%] relative text-white">
                            <h4>AI Models & Tools</h4>
                            <div className="absolute top-0 right-full w-20 h-20 flex justify-center items-center text-xl text-white border border-borderColor">01</div>
                        </div>
                        <div className="w-1/2 py-[26px] px-[3.6%] text-white text-lg">
                            <p>ChainGPT offers advanced AI models and tools explicitly designed for Web3, Blockchain, and Crypto use cases.</p>
                        </div>
                    </div>
                    <div className="flex border-t border-borderColor">
                        <div className="w-1/2 py-[26px] px-[3.6%] relative text-white">
                            <h4>AI Models & Tools</h4>
                            <div className="absolute top-0 right-full w-20 h-20 flex justify-center items-center text-xl text-white border border-borderColor">01</div>
                        </div>
                        <div className="w-1/2 py-[26px] px-[3.6%] text-white text-lg">
                            <p>ChainGPT offers advanced AI models and tools explicitly designed for Web3, Blockchain, and Crypto use cases.</p>
                        </div>
                    </div>
                    <div className="flex border-t border-borderColor">
                        <div className="w-1/2 py-[26px] px-[3.6%] relative text-white">
                            <h4>AI Models & Tools</h4>
                            <div className="absolute top-0 right-full w-20 h-20 flex justify-center items-center text-xl text-white border border-borderColor">01</div>
                            <div className="inline-block">
                                <Link to='#' className="mt-8 p-6 border border-borderColor text-white text-lg flex items-center gap-4 uppercase hover:opacity-60 duration-200">
                                    enter staking dashboard
                                    <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/6437b8bc549a694211710a04_arrow-right-color.svg" alt="" className="w-8 h-8" />
                                </Link>
                            </div>
                        </div>
                        <div className="w-1/2 py-[26px] px-[3.6%] text-white text-lg">
                            <p>ChainGPT offers advanced AI models and tools explicitly designed for Web3, Blockchain, and Crypto use cases.</p>
                        </div>
                    </div>
                    <div className="flex border-t border-borderColor">
                        <div className="w-1/2 py-[26px] px-[3.6%] relative text-white">
                            <h4>AI Models & Tools</h4>
                            <div className="absolute top-0 right-full w-20 h-20 flex justify-center items-center text-xl text-white border border-borderColor">01</div>
                            <div className="inline-block">
                                <Link to='#' className="mt-8 p-6 border border-borderColor text-white text-lg flex items-center gap-4 uppercase hover:opacity-60 duration-200">
                                    enter staking dashboard
                                    <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/6437b8bc549a694211710a04_arrow-right-color.svg" alt="" className="w-8 h-8" />
                                </Link>
                            </div>
                        </div>
                        <div className="w-1/2 py-[26px] px-[3.6%] text-white text-lg">
                            <p>ChainGPT offers advanced AI models and tools explicitly designed for Web3, Blockchain, and Crypto use cases.</p>
                        </div>
                    </div>
                </div>
            </ContainerSmall>
        </div>
    )
}
