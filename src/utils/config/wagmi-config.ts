import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

// import { mainnet, arbitrum, optimism, apeChain, base, bsc, polygon, sonicTestnet, avalanche, sepolia } from 'wagmi/chains'
import { polygonAmoy } from "wagmi/chains";
import { http } from "viem";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;
if (!projectId) {
  throw new Error(
    "Missing VITE_WALLET_CONNECT_PROJECT_ID environment variable"
  );
}

// 2. Create wagmiConfig
const metadata = {
  name: "Hydrapad",
  description: "Hello, World! This is Hydrapad",
  url: "https://www.hydrapad.com/", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// const chains = [mainnet, arbitrum,optimism, apeChain, base, bsc, polygon, sonicTestnet, avalanche, sepolia] as const
const chains = [polygonAmoy] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  transports: {
    [polygonAmoy.id]: http(),
  },
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});
