import { IconCaretRight, IconLoader2 } from "@tabler/icons-react";
import ContainerBig from "../ui/container-big";
import ContainerSmall from "../ui/container-small";
import { useAccount } from "wagmi";
import { useWriteContract } from "wagmi";
// import { abi } from "@/utils/config/abi";
import { toast } from "react-toastify";
import SonicSvg from "../icons/sonic-svg";
import { Link } from "react-router-dom";

export default function Intro() {
  const { isConnected, address } = useAccount();
//   const { isPending, writeContract } = useWriteContract();
  const { isPending } = useWriteContract();

  const mint = () => {
    if (!isConnected) {
      toast.warn("Please connect your wallet before minting a NFT.");
    } else if (address) {
    //   writeContract({
    //     address: "0x607683A0ced04d63d785fb3959AB35A4c75062bb",
    //     abi,
    //     functionName: "buyExactIn",
    //     args: [
    //       address,
    //       "ipfs://QmRUhHeBo4eeEvfJXTfDysxAUaN7GmxYiDER9bHEwqYfQy",
    //     ],
    //   });
    }
  };

  return (
    <ContainerBig>
      <ContainerSmall className="relative">
        <div className="py-32 block md:flex items-stretch">
          <div className="w-full md:w-1/2 bg-bgColor relative">
            <div className="absolute bottom-full left-0 border border-b-0 border-white w-[66px] h-[66px] flex justify-center items-center">
              <img
                src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/643550c922d6d37de6ffd28c_ico-quote.svg"
                loading="lazy"
                width="20"
                height="16"
                alt=""
              />
            </div>
            <img
              src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/643550c922d6d34b8dffd28d_corner.svg"
              loading="lazy"
              alt=""
              className="absolute hidden sm:block bottom-full translate-y-[-66px] right-full translate-x-[-7px]"
            />
            <img
              src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/643550c922d6d34b8dffd28d_corner.svg"
              loading="lazy"
              alt=""
              className="absolute hidden sm:block top-full right-full translate-x-[-7px] -rotate-90"
            />
            <div className="h-full border border-white p-5 relative">
              <p className="mb-2">
                Safety and security should be at the heart of all platforms,
                especially public goods services, which is why we are passionate
                about providing technical support and high level security
                integration for projects from all blockchains and backgrounds.
              </p>
              <p>Join us to make a difference in the blockchain space.</p>
              <div className="absolute w-full h-1/2 bottom-0 left-0 bg-gradient-to-b from-[#09090e00] to-[#0a090f]" />
            </div>
            <div className="absolute top-full left-0 p-5 flex items-center opacity-50">
              Contact us at any time via our social media or community forum ...
            </div>
          </div>
          <div className="w-full md:w-1/2 relative bg-bgColor border-x border-borderColor">
            <div className="border-t border-borderColor">
              <div className="flex justify-between items-center w-full xl:w-1/2 ml-auto px-3 py-2 xl:pl-0">
                <img
                  src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/643550c922d6d3e0dcffd28b_ico-indicator.svg"
                  loading="lazy"
                  alt=""
                  className="w-[6px]"
                />
                <p className="text-white">COMMUNITY GROWTH</p>
              </div>
            </div>
            <div className="border-t border-borderColor">
              <div className="flex justify-between items-center w-full xl:w-1/2 ml-auto px-3 py-2 xl:pl-0">
                <img
                  src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/643550c922d6d3e0dcffd28b_ico-indicator.svg"
                  loading="lazy"
                  alt=""
                  className="w-[6px]"
                />
                <p className="text-white">FAIR GOVERNANCE</p>
              </div>
            </div>
            <div className="border-t border-borderColor">
              <div className="flex justify-between items-center w-full xl:w-1/2 ml-auto px-3 py-2 xl:pl-0">
                <img
                  src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/643550c922d6d3e0dcffd28b_ico-indicator.svg"
                  loading="lazy"
                  alt=""
                  className="w-[6px]"
                />
                <p className="text-white">DEVELOPMENT & RESEARCH</p>
              </div>
            </div>
            <div className="border-t border-borderColor">
              <div className="flex justify-between items-center w-full xl:w-1/2 ml-auto px-3 py-2 xl:pl-0">
                <img
                  src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/643550c922d6d3e0dcffd28b_ico-indicator.svg"
                  loading="lazy"
                  alt=""
                  className="w-[6px]"
                />
                <p className="text-white">LAUNCHPAD</p>
              </div>
            </div>
            <div className="border-t border-borderColor">
              <div className="flex justify-between items-center w-full xl:w-1/2 ml-auto px-3 py-2 xl:pl-0">
                <img
                  src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/643550c922d6d3e0dcffd28b_ico-indicator.svg"
                  loading="lazy"
                  alt=""
                  className="w-[6px]"
                />
                <p className="text-white">WEB3 EDUCATION</p>
              </div>
            </div>
            <div className="absolute top-full left-0 w-full border-t border-borderColor pr-4 py-2 text-right">
              <p className="text-white opacity-60">AND MUCH MORE</p>
            </div>
          </div>
        </div>
      </ContainerSmall>
      <div className="md:flex block">
        <div className="md:w-1/2">
          <p className="text-white text-xl mb-4">DECENTRALIZED REVOLUTION</p>
          <div>
            <div className="relative mb-2">
              <h2 className="pl-4 inline-block">WHITE HAT</h2>
              <div className="absolute top-1/2 -translate-y-1/2 left-0">
                <svg
                  viewBox="0 0 440 96"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="300"
                >
                  <path
                    className="path-anim path-anim-2"
                    d="M177.5 94H402.257C403.053 94 403.816 93.6839 404.379 93.1213L419 78.5"
                    stroke="rgb(200, 200, 200)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>
                  <path
                    className="path-anim path-anim-1"
                    d="M2 77V19.2426C2 18.447 2.31607 17.6839 2.87868 17.1213L17.1213 2.87868C17.6839 2.31607 18.447 2 19.2426 2H417"
                    stroke="rgb(200, 200, 200)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>
                  <defs>
                    <linearGradient
                      id="paint0_linear_2309_6568"
                      x1="67.5"
                      y1="101"
                      x2="428.5"
                      y2="75"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F8CF3E"></stop>
                      <stop offset="1" stopColor="#FC6756"></stop>
                      <stop offset="1" stopColor="#FC6756"></stop>
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_2309_6568"
                      x1="416.5"
                      y1="-9.50001"
                      x2="25.7657"
                      y2="-140.863"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0.236372" stopColor="#724CE8"></stop>
                      <stop offset="1" stopColor="#26F4D0"></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="hero-bottom-line"></div>
            </div>
            <div className="relative">
              <h2 className="pl-4 inline-block">DAO</h2>
              <div className="absolute top-1/2 -translate-y-1/2 left-0">
                <svg
                  width="130"
                  viewBox="0 0 220 88"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="path-anim path-anim-left"
                    d="M2 2V68.7574C2 69.553 2.31607 70.3161 2.87868 70.8787L17.1213 85.1213C17.6839 85.6839 18.447 86 19.2426 86H110"
                    stroke="rgb(200, 200, 200)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>
                  <path
                    className="path-anim path-anim-right"
                    d="M110 86H220C219.657 86 219 84.6569 219 83V15.2426C219 14.447 219.684 13.6839 219.121 13.1213L207.5 1.5"
                    stroke="rgb(200, 200, 200)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>
                  <defs>
                    <linearGradient
                      id="paint0_linear_2309_6569"
                      x1="1.5"
                      y1="-1.3292e-06"
                      x2="123"
                      y2="86"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#26F4D0"></stop>
                      <stop offset="0.634676" stopColor="#F8CF3E"></stop>
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_2309_6569"
                      x1="45"
                      y1="81.5"
                      x2="119"
                      y2="24"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0.436639" stopColor="#F8CF3E"></stop>
                      <stop offset="1" stopColor="#FC6756"></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-[33vw] md:w-1/2 md:mt-0 mt-4">
          <p className="text-white text-xl mb-4">Building on</p>
          <div className="flex justify-between items-center border-y border-[#cccccc] p-2">
            <SonicSvg />
            <Link
              target="_blank"
              to={"https://testnet.soniclabs.com/"}
              className="flex items-center gap-4 text-xl"
            >
              TRY IN WEB APP
              <img
                src="https://cdn.prod.website-files.com/64354b8ce4872ad8cd1c7b04/6437b8bc549a694211710a04_arrow-right-color.svg"
                loading="lazy"
                alt=""
                className="w-[25px] h-[25px]"
              />
            </Link>
          </div>
        </div>
      </div>
      <ContainerSmall className="block md:flex mt-8 mb-16">
        <div className="w-full md:w-1/2 px-4">
          <p className="mb-3">
            White Hat DAO is a decentralized autonomous organization. Governed
            by a clear set of rules and executes actions automatically. Thus,
            effectively disregarding intermediaries. WHD governed by Governance
            token holders. It does not have any employees. DAO Governors may
            introduce proposals via community forum. Once submitted, the DAO
            members & governance guilds will debate on the validity / legitimacy
            of the proposal, if passed the initial due diligence, the proposal
            will be sent to onchain for final voting round. The token holders
            will vote on whether to approve or reject any proposals.
          </p>

          <div className="mt-12 rounded border border-gray-500 p-4 bg-bgColor z-10 relative">
            <div className="flex justify-between items-center mb-3">
              <img src="/assets/images/logo.png" alt="logo" width={48} />
              <p className="text-xl">Become a WHD Member</p>
              <span className="px-4 py-1 border border-gray-600 text-sm">
                Mint fee - $100
              </span>
            </div>
            <div className="mb-3">
              <div className="flex justify-between items-center">
                <p className="text-lg">MEMBERSHIP NFT</p>
                <span className="border border-orange-500 text-orange-500 px-2">
                  Total amount of NFT - 10000
                </span>
              </div>
              <p className="text-sm">Network: Sonic</p>
            </div>
            <div className="xl:flex md:block sm:flex items-center justify-between">
              <div className="flex justify-between xl:mb-0 md:mb-4 sm:mb-0 mb-4">
                <div className="rounded bg-light-blue-500 p-1 text-sm mr-2">
                  Forum Discussion
                </div>
                <div className="rounded bg-deep-purple-500 p-1 text-sm">
                  Governance Access
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  className="flex items-center p-1 bg-green-700 rounded cursor-pointer"
                  onClick={mint}
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <IconLoader2 size={18} className="animate-spin mx-2" />
                      <p>Pending...</p>
                    </>
                  ) : (
                    <>
                      <p className="mx-3">MINT</p>
                      <IconCaretRight size={18} fill="white" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4 rounded border border-gray-500 p-3 bg-bgColor z-10 relative text-green-500">
            <span className="text-orange-500">Note: </span> By holding
            membership NFT users will receive guaranteed Gov token allocation,
            Plus 10% platform revenue will be shared with the NFT holders in
            monthly. Distributed equally per NFT.
          </div>
        </div>
        <div className="w-full md:w-1/2 px-4 mt-8 md:mt-0">
          <div className="md:border border-borderColor rounded-md h-full w-full flex p-3">
            <div className="w-full xl:max-w-[500px] 2xl:max-w-[340px] m-auto p-2 relative">
              <img
                src="/assets/images/nft-image.png"
                className="rounded-[5%]"
                alt=""
              />
              <svg
                viewBox="0 0 420 96"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full absolute top-0 left-0"
              >
                <path
                  className="path-anim path-anim-1"
                  d="M2 55V19.2426C2 18.447 2.31607 17.6839 2.87868 17.1213L17.1213 2.87868C17.6839 2.31607 18.447 2 19.2426 2H417"
                  stroke="url(#paint1_linear_2309_6568)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                ></path>
                <defs>
                  <linearGradient
                    id="paint1_linear_2309_6568"
                    x1="416.5"
                    y1="-9.50001"
                    x2="25.7657"
                    y2="-140.863"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.236372" stopColor="#724CE8"></stop>
                    <stop offset="1" stopColor="#26F4D0"></stop>
                  </linearGradient>
                </defs>
              </svg>
              <svg
                viewBox="0 0 420 96"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full absolute bottom-0 left-0"
              >
                <path
                  className="path-anim path-anim-2"
                  d="M20.5 94H402.257C403.053 94 403.816 93.6839 404.379 93.1213L419 78.5"
                  stroke="url(#paint0_linear_2309_6568)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                ></path>
                <defs>
                  <linearGradient
                    id="paint0_linear_2309_6568"
                    x1="67.5"
                    y1="101"
                    x2="428.5"
                    y2="75"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F8CF3E"></stop>
                    <stop offset="1" stopColor="#FC6756"></stop>
                    <stop offset="1" stopColor="#FC6756"></stop>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </ContainerSmall>
    </ContainerBig>
  );
}
