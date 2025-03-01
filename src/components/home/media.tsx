import { Link } from "react-router-dom";

export default function Media() {
    return (
        <div className="pt-[114px] pb-[76px] px-[2.2vw] lg-max:px-[4.3vw]">
            <div className="pb-28">
                <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/646201707951b1100b67ddfd_double-dots.svg" loading="lazy" alt="Robot Eyes" className="h-[4px] ml-2 mb-10" />
                <h2>Explore our</h2>
                <div className="flex">
                    <div className="w-1/2">
                        <div className="flex gap-8 leading-[1]">
                            <Link to='#' className="text-white text-[60px] p-4 relative">
                                blog
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0">
                                    <path d="M1 15V5.41421C1 5.149 1.10536 4.89464 1.29289 4.70711L4.70711 1.29289C4.89464 1.10536 5.149 1 5.41421 1H15" stroke="#EFEFE5"></path>
                                </svg>
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 right-0 rotate-90">
                                    <path d="M1 15V5.41421C1 5.149 1.10536 4.89464 1.29289 4.70711L4.70711 1.29289C4.89464 1.10536 5.149 1 5.41421 1H15" stroke="#EFEFE5"></path>
                                </svg>
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 right-0 rotate-180">
                                    <path d="M1 15V5.41421C1 5.149 1.10536 4.89464 1.29289 4.70711L4.70711 1.29289C4.89464 1.10536 5.149 1 5.41421 1H15" stroke="#EFEFE5"></path>
                                </svg>
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 -rotate-90">
                                    <path d="M1 15V5.41421C1 5.149 1.10536 4.89464 1.29289 4.70711L4.70711 1.29289C4.89464 1.10536 5.149 1 5.41421 1H15" stroke="#EFEFE5"></path>
                                </svg>
                            </Link>
                            <Link to='#' className="text-[60px] p-4 cursor-pointer opacity-60 hover:opacity-100">
                                vlog
                            </Link>
                            <Link to='#' className="text-[60px] p-4 cursor-pointer opacity-60 hover:opacity-100">
                                spaces
                            </Link>
                        </div>
                    </div>
                    <div className="w-[33vw] flex justify-between items-center pl-6 text-xl">
                        <div className="flex gap-4">
                            <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/6475c21b8be0c640d5a29c45_ico-bullet-bright.svg" alt="" />
                            READ MORE
                        </div>
                        <Link to='#' className="flex gap-4 items-center text-center">
                            VISIT BLOG PAGE
                            <div className="w-[85px] h-[85px] flex justify-center items-center border border-borderColor">
                                <img width="38" height="38" alt="" src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/6437b8bc549a694211710a04_arrow-right-color.svg" loading="lazy" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="w-[33vw] ml-[14.8vw] text-xl relative">
                <div className="absolute top-0 right-full w-[14.8vw] flex gap-4">
                    <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/6446951576624313547bb1bd_arrow-next.svg" className="w-[64px] h-[64px] cursor-pointer hover:opacity-70 duration-150 rotate-180" alt="" />
                    <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/6446951576624313547bb1bd_arrow-next.svg" className="w-[64px] h-[64px] cursor-pointer hover:opacity-70 duration-150" alt="" />
                </div>
                <div className="flex w-max">
                    <div className="w-[33vw] p-10 border-y border-borderColor">
                        <Link to='#' className="hover:opacity-60 duration-200">
                            <p className="flex items-center mb-8 opacity-70">
                                MAY 31, 2024
                                <span className="w-1 h-1 bg-textColor mx-4" />
                                3 MIN
                                <span className="w-1 h-1 bg-textColor mx-4" />
                                ANNOUNCEMENTS
                            </p>
                            <div className="px-6 py-8 relative">
                                <img
                                    src="https://cdn.prod.website-files.com/64354b8ce4872a52ac1c7b06/6654901c692070eee28e91a0_03.%20NFT%20Generator%20Announcements%20(2).jpg"
                                    alt="ChainGPT and Arbitrum: A Strategic Integration to Enhance NFT and AI Applications"
                                    className="w-full border border-borderColor"
                                />
                                <span className="absolute top-0 left-0 w-3 h-3 border-r border-b border-borderColor" />
                                <span className="absolute top-0 right-0 w-3 h-3 border-l border-b border-borderColor" />
                                <span className="absolute bottom-0 right-0 w-3 h-3 border-l border-t border-borderColor" />
                                <span className="absolute bottom-0 left-0 w-3 h-3 border-r border-t border-borderColor" />
                            </div>
                            <h4 className="mt-12 mb-16 text-3xl">ChainGPT AI NFT Saturday Spotlight: Winners for 06.01</h4>
                            <div className="flex items-center gap-4">
                                <img
                                    src="https://cdn.prod.website-files.com/64354b8ce4872a52ac1c7b06/662bb442e00c116a1a5155eb_e18d24e8-1e41-4ed1-ab7b-0520ec35d41c.png"
                                    alt=""
                                    className="w-10 h-10"
                                />
                                <span className="opacity-70">BY</span>
                                <span>FERNANDO FIERRO</span>
                            </div>
                        </Link>
                    </div>
                    <div className="w-[33vw] p-10 border-y border-borderColor">
                        <Link to='#' className="hover:opacity-60 duration-200">
                            <p className="flex items-center mb-8 opacity-70">
                                MAY 31, 2024
                                <span className="w-1 h-1 bg-textColor mx-4" />
                                3 MIN
                                <span className="w-1 h-1 bg-textColor mx-4" />
                                ANNOUNCEMENTS
                            </p>
                            <div className="px-6 py-8 relative">
                                <img
                                    src="https://cdn.prod.website-files.com/64354b8ce4872a52ac1c7b06/6654901c692070eee28e91a0_03.%20NFT%20Generator%20Announcements%20(2).jpg"
                                    alt="ChainGPT and Arbitrum: A Strategic Integration to Enhance NFT and AI Applications"
                                    className="w-full border border-borderColor"
                                />
                                <span className="absolute top-0 left-0 w-3 h-3 border-r border-b border-borderColor" />
                                <span className="absolute top-0 right-0 w-3 h-3 border-l border-b border-borderColor" />
                                <span className="absolute bottom-0 right-0 w-3 h-3 border-l border-t border-borderColor" />
                                <span className="absolute bottom-0 left-0 w-3 h-3 border-r border-t border-borderColor" />
                            </div>
                            <h4 className="mt-12 mb-16 text-3xl">ChainGPT AI NFT Saturday Spotlight: Winners for 06.01</h4>
                            <div className="flex items-center gap-4">
                                <img
                                    src="https://cdn.prod.website-files.com/64354b8ce4872a52ac1c7b06/662bb442e00c116a1a5155eb_e18d24e8-1e41-4ed1-ab7b-0520ec35d41c.png"
                                    alt=""
                                    className="w-10 h-10"
                                />
                                <span className="opacity-70">BY</span>
                                <span>FERNANDO FIERRO</span>
                            </div>
                        </Link>
                    </div>
                    <div className="w-[33vw] p-10 border-y border-borderColor">
                        <Link to='#' className="hover:opacity-60 duration-200">
                            <p className="flex items-center mb-8 opacity-70">
                                MAY 31, 2024
                                <span className="w-1 h-1 bg-textColor mx-4" />
                                3 MIN
                                <span className="w-1 h-1 bg-textColor mx-4" />
                                ANNOUNCEMENTS
                            </p>
                            <div className="px-6 py-8 relative">
                                <img
                                    src="https://cdn.prod.website-files.com/64354b8ce4872a52ac1c7b06/6654901c692070eee28e91a0_03.%20NFT%20Generator%20Announcements%20(2).jpg"
                                    alt="ChainGPT and Arbitrum: A Strategic Integration to Enhance NFT and AI Applications"
                                    className="w-full border border-borderColor"
                                />
                                <span className="absolute top-0 left-0 w-3 h-3 border-r border-b border-borderColor" />
                                <span className="absolute top-0 right-0 w-3 h-3 border-l border-b border-borderColor" />
                                <span className="absolute bottom-0 right-0 w-3 h-3 border-l border-t border-borderColor" />
                                <span className="absolute bottom-0 left-0 w-3 h-3 border-r border-t border-borderColor" />
                            </div>
                            <h4 className="mt-12 mb-16 text-3xl">ChainGPT AI NFT Saturday Spotlight: Winners for 06.01</h4>
                            <div className="flex items-center gap-4">
                                <img
                                    src="https://cdn.prod.website-files.com/64354b8ce4872a52ac1c7b06/662bb442e00c116a1a5155eb_e18d24e8-1e41-4ed1-ab7b-0520ec35d41c.png"
                                    alt=""
                                    className="w-10 h-10"
                                />
                                <span className="opacity-70">BY</span>
                                <span>FERNANDO FIERRO</span>
                            </div>
                        </Link>
                    </div>
                    <div className="w-[33vw] p-10 border-y border-borderColor">
                        <Link to='#' className="hover:opacity-60 duration-200">
                            <p className="flex items-center mb-8 opacity-70">
                                MAY 31, 2024
                                <span className="w-1 h-1 bg-textColor mx-4" />
                                3 MIN
                                <span className="w-1 h-1 bg-textColor mx-4" />
                                ANNOUNCEMENTS
                            </p>
                            <div className="px-6 py-8 relative">
                                <img
                                    src="https://cdn.prod.website-files.com/64354b8ce4872a52ac1c7b06/6654901c692070eee28e91a0_03.%20NFT%20Generator%20Announcements%20(2).jpg"
                                    alt="ChainGPT and Arbitrum: A Strategic Integration to Enhance NFT and AI Applications"
                                    className="w-full border border-borderColor"
                                />
                                <span className="absolute top-0 left-0 w-3 h-3 border-r border-b border-borderColor" />
                                <span className="absolute top-0 right-0 w-3 h-3 border-l border-b border-borderColor" />
                                <span className="absolute bottom-0 right-0 w-3 h-3 border-l border-t border-borderColor" />
                                <span className="absolute bottom-0 left-0 w-3 h-3 border-r border-t border-borderColor" />
                            </div>
                            <h4 className="mt-12 mb-16 text-3xl">ChainGPT AI NFT Saturday Spotlight: Winners for 06.01</h4>
                            <div className="flex items-center gap-4">
                                <img
                                    src="https://cdn.prod.website-files.com/64354b8ce4872a52ac1c7b06/662bb442e00c116a1a5155eb_e18d24e8-1e41-4ed1-ab7b-0520ec35d41c.png"
                                    alt=""
                                    className="w-10 h-10"
                                />
                                <span className="opacity-70">BY</span>
                                <span>FERNANDO FIERRO</span>
                            </div>
                        </Link>
                    </div>
                    <div className="w-[33vw] p-10 border-y border-borderColor">
                        <Link to='#' className="hover:opacity-60 duration-200">
                            <p className="flex items-center mb-8 opacity-70">
                                MAY 31, 2024
                                <span className="w-1 h-1 bg-textColor mx-4" />
                                3 MIN
                                <span className="w-1 h-1 bg-textColor mx-4" />
                                ANNOUNCEMENTS
                            </p>
                            <div className="px-6 py-8 relative">
                                <img
                                    src="https://cdn.prod.website-files.com/64354b8ce4872a52ac1c7b06/6654901c692070eee28e91a0_03.%20NFT%20Generator%20Announcements%20(2).jpg"
                                    alt="ChainGPT and Arbitrum: A Strategic Integration to Enhance NFT and AI Applications"
                                    className="w-full border border-borderColor"
                                />
                                <span className="absolute top-0 left-0 w-3 h-3 border-r border-b border-borderColor" />
                                <span className="absolute top-0 right-0 w-3 h-3 border-l border-b border-borderColor" />
                                <span className="absolute bottom-0 right-0 w-3 h-3 border-l border-t border-borderColor" />
                                <span className="absolute bottom-0 left-0 w-3 h-3 border-r border-t border-borderColor" />
                            </div>
                            <h4 className="mt-12 mb-16 text-3xl">ChainGPT AI NFT Saturday Spotlight: Winners for 06.01</h4>
                            <div className="flex items-center gap-4">
                                <img
                                    src="https://cdn.prod.website-files.com/64354b8ce4872a52ac1c7b06/662bb442e00c116a1a5155eb_e18d24e8-1e41-4ed1-ab7b-0520ec35d41c.png"
                                    alt=""
                                    className="w-10 h-10"
                                />
                                <span className="opacity-70">BY</span>
                                <span>FERNANDO FIERRO</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
