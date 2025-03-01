import { Link } from "react-router-dom";
import ContainerSmall from "../ui/container-small";
import Accordion from "../ui/accordion";

export default function Faq() {
    return (
        <div className="pt-[80px] px-[2.2vw] lg-max:px-[4.3vw]">
            <div>
                <img src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/646201707951b1100b67ddfd_double-dots.svg" loading="lazy" alt="Robot Eyes" className="h-[4px] ml-2 mb-10" />
                <div className="flex text-white">
                    <div className="w-1/2">
                        <h2>Frequently asked</h2>
                        <div className="relative">
                            <h2 className="px-4 py-2">Questions</h2>
                            <span className="absolute top-1/2 -translate-y-1/2 left-0">
                                <svg viewBox="0 0 240 66" fill="none" xmlns="http://www.w3.org/2000/svg" width="240">
                                    <path className="path-anim path-anim-1" d="M2 64V15L15 2H238V50L224 64H2" stroke="rgb(200, 200, 200)" strokeWidth="1" strokeLinecap="round"></path>
                                    <defs>
                                        <linearGradient id="paint1_linear_2309_6568" x1="416.5" y1="-9.50001" x2="25.7657" y2="-140.863" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.236372" stopColor="#724CE8"></stop>
                                            <stop offset="1" stopColor="#26F4D0"></stop>
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <ContainerSmall>
                <div className="flex items-center my-12">
                    <div className="w-1/2 flex justify-center">
                        <Link to='#' className="w-5/6 md:w-2/3 h-20 text-xl text-white flex justify-center items-center relative">
                            About White Hat DAO
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
                    <div className="w-1/2 flex justify-center">
                        <p className="text-xl">
                            Can’t find an answer to your question?
                            <br />
                            Feel free to{' '}
                            <Link to='#' className="underline hover:no-underline">contact us.</Link>
                        </p>
                    </div>
                </div>
                <div>
                    <Accordion
                        title="What is the purpose of White Hat DAO ?"
                        content={(
                            <p>DeFi and web3 in general can be overwhelming, especially considering the amount of due diligence and analysis that stems from engaging with each new project. White Hat DAO aims to lower the risk of entry to web3 space by providing a safety rating platform to aggregate safety and security data on web3 projects, and act as a hub for web3 infosec activities.</p>
                        )}
                    />
                    <Accordion
                        title="What are the products White Hat DAO working on ?"
                        content={(
                            <div>
                                <p>Our Products are below:</p>
                                <p>Safety Rating on Sonic Network</p>
                                <p>Sonic Native Decentralized Exchange</p>
                                <p>Sonic Native NFT Marketplace</p>
                                <p>Sonic Native Launchpad</p>
                                <p>DAO Governance App</p>
                            </div>
                        )}
                    />
                    <Accordion
                        title="What is the mission & vision?"
                        content={(
                            <>
                                <p>White Hat DAO is a Decentralized Autonomous Organization and aims to build a better, safer environment for the web3 community. WHD provides solutions through research, education, web3 tools. Our safety & security applications will provide much needed security details for web3 users and investors before investing in any projects.</p>
                            </>
                        )}
                    />
                    <Accordion
                        title="Who are your competitors?"
                        content={(
                            <p>We are not here for competition; rather, we would like to work with all projects from different content niches and industries as long as we can raise awareness to create a safer environment in the web3 space.</p>
                        )}
                    />
                    <Accordion
                        title="What is the legal status of White Hat DAO ?"
                        content={(
                            <p>White Hat DAO has been registered as a legal entity under the name of ( White Hat DAO LLC ) as a Decentralized Autonomous Organization. Governed by a clear set of rules and executes actions automatically. Thus, effectively disregarding intermediaries. White Hat DAO controlled by Governance token holders. It does not have any employees. DAO Governors may propose any proposals drafted via our community forum. Once submitted the token holders will vote on whether to approve or reject these proposals.</p>
                        )}
                    />
                    <Accordion
                        title="Why are we building on Sonic?"
                        content={(
                            <>
                                <p>Sonic offers several compelling advantages for projects:</p>
                                <div className="pl-4 my-4">
                                    <p>1. <strong>Performance: </strong>Sonic is designed for speed and efficiency, enabling real-time data processing and reducing latency, which is crucial for applications requiring quick response times.</p>
                                    <p>2. <strong>Scalability: </strong>With its robust architecture, Sonic can handle increased loads seamlessly, making it suitable for projects that anticipate growth and demand.</p>
                                    <p>3. <strong>Flexibility: </strong>Sonic supports a variety of data types and formats, allowing developers to easily integrate it into diverse systems and workflows.</p>
                                    <p>4. <strong>Open Source: </strong>Being open-source fosters community support and collaboration, ensuring continuous improvement and innovation through contributions from developers worldwide.</p>
                                    <p>5. <strong>User-Friendly: </strong>Sonic offers a straightforward API, making it accessible for developers of all skill levels and accelerating the development process.</p>
                                    <p>6. <strong>Rich Ecosystem: </strong>The platform benefits from a growing ecosystem of tools and resources, enhancing its functionality and ease of integration into existing projects.</p>
                                </div>
                                <p>In summary, choosing Sonic for your project means leveraging a high-performance, scalable, and flexible solution backed by a supportive community, which can significantly enhance your development efforts and project outcomes.</p>
                            </>
                        )}
                    />
                </div>
                <div className="p-6 bg-bgColor border-x border-borderColor relative z-10">
                    <p className="text-lg opacity-70">Note: Reach out to us via email or our social sites for more Q&A. We would love to hear from you</p>
                </div>
            </ContainerSmall>
        </div>
    )
}
