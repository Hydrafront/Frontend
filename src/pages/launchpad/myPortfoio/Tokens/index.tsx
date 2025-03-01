import WalletSvg from "@/components/icons/Wallet-svg";
import { Button, ButtonGroup, IconButton } from "@material-tailwind/react";
import { IconCaretUp, IconDots } from "@tabler/icons-react";
import WalletList from "./WalletList";

const Tokens: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between py-6">
        <h4 className="ml-2 md:ml-16">Assets</h4>
        <div className="flex">
          <ButtonGroup placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <Button placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>By App</Button>
            <Button placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} className="ml-1 border-none">By Token</Button>
          </ButtonGroup>
          <IconButton className="ml-3" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <IconDots />
          </IconButton>
        </div>
      </div>
      <div className="bg-lighterColor flex py-5 px-10 items-center">
        <WalletSvg className="mr-5" />
        <h5>Wallet · $317</h5>
        <div>
          <div className="flex items-center bg-lightestColor rounded-md px-2 ml-2 text-green-500 text-[11px]">95.6% <IconCaretUp className="w-[10px] ml-1" /></div>
        </div>
      </div>
      <div>
        <WalletList />
      </div>
    </div>
  )
}
export default Tokens;