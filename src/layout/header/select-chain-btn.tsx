// import { IconDots, IconLoader2 } from "@tabler/icons-react"
import { useState } from "react";
import { useChainId, useChains, useSwitchChain } from "wagmi";

const ConnectWalletBtn = () => {
  const chains = useChains();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <span
      className="inline-block p-1 cursor-pointer relative 2xl:scale-100 xl:scale-90 scale-75 translate-x-[12.5%] lg:translate-x-0 h-fit"
      onClick={() => setOpenMenu(!openMenu)}
    >
      <div className="bg-[#0A090F] h-min w-max flex gap-2 justify-between items-center px-2">
        <p className="flex items-center gap-2 shrink-text">
          {chains.some((x) => x.id === chainId) ? (
            <>
              <img
                src={`/assets/images/chains/${
                  chains.find((x) => x.id === chainId)!.name
                }.png`}
                width="20"
                height="20"
              />
              <span>{chains.find((x) => x.id === chainId)?.name}</span>
              <svg
                className={"transition " + (openMenu ? "rotate-180" : "")}
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </>
          ) : (
            "Wrong Network"
          )}
        </p>
      </div>
      {openMenu && (
        <div
          className="flex flex-col absolute top-[calc(100%+10px)] right-0 bg-black border border-white rounded-xl overflow-hidden"
          style={{ width: "max-content" }}
        >
          {chains.map((x, i) => (
            <button
              className="flex items-center gap-4 transition hover:bg-grey1 px-5 py-2"
              key={i}
              onClick={() => switchChain({ chainId: x.id })}
            >
              <img
                src={`/assets/images/chains/${x.name}.png`}
                width="20"
                height="20"
              />
              <span>
                {x.name} {x.id === chainId && "(Using)"}
              </span>
            </button>
          ))}
        </div>
      )}
      <span className="bg-white w-full h-[1px] absolute top-[-4px] left-[4px]" />
      <span className="bg-white h-full w-[1px] absolute bottom-[4px] right-[-4px]" />
      <span className="bg-white w-full h-[1px] absolute bottom-[-4px] right-[4px]" />
      <span className="bg-white h-[70%] w-[1px] absolute bottom-[-4px] left-[-4px]" />
      <span className="bg-white h-[11.312px] w-[1px] absolute bottom-[-5.3px] right-0 rotate-45" />
      <span className="bg-white h-[11.312px] w-[1px] absolute top-[-5.3px] left-0 rotate-45" />
    </span>
  );
};

export default ConnectWalletBtn;
