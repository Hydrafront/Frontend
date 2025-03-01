import GradientButton from "@/components/common/GradientButton";
import { Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import { useState } from "react";

const Popup: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setOpen(!open)
  }
  return (
    <Dialog placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
      open={open}
      handler={handleOpen}
      className="bg-lightColor py-3 px-2"
    >
      <DialogHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <div className="text-center m-auto bg-[#23202F] font-primary font-light py-2 px-5 mx-8 text-[24px] rounded-lg">Presale page terms & Conditions</div>
      </DialogHeader>
      <DialogBody className="text-center max-h-[30vh] overflow-y-scroll sm:overflow-y-auto text-gray-300 font-primary px-8 text-[14px]" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      Cryptocurrencies are inherently speculative, complex, and carry significant risks. Their volatility and sensitivity to external factors can result in unpredictable performance, and past results do not guarantee future outcomes. Please be aware that HYDRAPAD cannot be held responsible for your trading or investment decisions. We strongly encourage you to consider your individual circumstances and conduct your own due diligence before investing in any projects. By accessing our services, you acknowledge and agree to these terms and conditions.
      </DialogBody>
      <DialogFooter className="flex justify-center" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <GradientButton onClick={handleOpen} className="text-white rounded-lg px-8">I Accept</GradientButton>
      </DialogFooter>
    </Dialog>
  )
}
export default Popup;
