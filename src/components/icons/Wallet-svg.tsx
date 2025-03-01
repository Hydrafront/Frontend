import { SVGProps } from "react";

const WalletSvg: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg width="38" height="36" viewBox="0 0 38 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M36 30V32C36 34.21 34.21 36 32 36H4C1.79 36 0 34.21 0 32V4C0 1.79 1.79 0 4 0H32C34.21 0 36 1.79 36 4V6H18C15.79 6 14 7.79 14 10V26C14 28.21 15.79 30 18 30H36ZM18 26H38V10H18V26ZM26 21C24.34 21 23 19.66 23 18C23 16.34 24.34 15 26 15C27.66 15 29 16.34 29 18C29 19.66 27.66 21 26 21Z" fill="url(#paint0_linear_9_7300)" />
      <defs>
        <linearGradient id="paint0_linear_9_7300" x1="19" y1="0" x2="19" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F6851B" />
          <stop offset="1" stopColor="#FC6756" />
        </linearGradient>
      </defs>
    </svg>



  )
}
export default WalletSvg;