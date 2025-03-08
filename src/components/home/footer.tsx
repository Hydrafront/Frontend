import {
  IconBrandDiscord,
  IconBrandTelegram,
  IconBrandTwitter,
} from "@tabler/icons-react";
import ContainerBig from "../ui/container-big";
import { Link } from "react-router-dom";
import { useState } from "react";
import ContactForm from "../common/ContactForm";
import { useAppDispatch } from "@/store/hooks";
import { openDialog } from "@/store/reducers/dialog-slice";
// import { toast } from "react-toastify";

export default function Footer() {
  const [emailContent, setEmailContent] = useState("");
  const dispatch = useAppDispatch();

  return (
    <div className="bg-bgColor relative">
      <div className="w-full lg:w-[93.2vw] mx-auto h-[1.2vw] border-t border-borderColor relative">
        <div className="w-[1px] h-[1.69705vw] bg-borderColor absolute -top-[0.24853vw] -left-[0.6vw] rotate-45 lg-max:hidden" />
        <div className="w-[1px] h-[1.69705vw] bg-borderColor absolute -top-[0.24853vw] -right-[0.6vw] -rotate-45 lg-max:hidden" />
      </div>
      <ContainerBig className="lg:border-x border-borderColor py-8">
        <div className="lg:flex">
          <div className="w-[14.8vw] lg:pl-[4vw]">
            <img src="/assets/images/HYD.png" alt="" className="w-14" />
            <div className="flex items-center gap-3 mt-14">
              <Link to="https://x.com/Hydra_Pad" target="_blank">
                <IconBrandTwitter className="opacity-60 hover:opacity-100 cursor-pointer duration-200 w-[30px] h-[30px]" />
              </Link>
              <Link to="http://discord.gg/ESnjKeeRbE" target="_blank">
                <IconBrandDiscord className="opacity-60 hover:opacity-100 cursor-pointer duration-200 w-[30px] h-[30px]" />
              </Link>
              <Link to="http://t.me/hydra_pad" target="_blank">
                <IconBrandTelegram className="opacity-60 hover:opacity-100 cursor-pointer duration-200 w-[30px] h-[30px]" />
              </Link>
            </div>
          </div>
          <div className="w-[91.4vw] lg:w-[66vw]">
            <p className="text-white mb-10 lg:w-1/2">
              We want to make it easy for everyone to embrace the web3 ecosystem
              in a secure, decentralized and future-proof way. Join us in this
              Journey.
            </p>
            <div className="flex justify-between items-center pb-2 border-b border-borderColor mb-4">
              <input
                type="text"
                className="border-0 p-0 m-0 outline-none w-[calc(100%-160px)] bg-transparent"
                placeholder="Powered by WHD"
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
              />
              <span
                className="py-1 px-10 text-white text-lg relative cursor-pointer hover:text-opacity-60 duration-200 w-max"
                onClick={() => {
                  // if (emailContent?.length > 0) {
                    dispatch(
                      openDialog({
                        title: "Contact Us",
                        children: <ContactForm />,
                      })
                    );
                  // } else {
                  //   toast.error("Please enter your email", {
                  //     style: { background: "#211e2ce0", color: "white" },
                  //   });
                  // }
                }}
              >
                Email Us
                <span className="absolute -top-1 left-1 w-full h-[1px] bg-borderColor" />
                <span className="absolute bottom-1 -right-1 w-[1px] h-full bg-borderColor" />
                <span className="absolute -bottom-1 right-1 w-full h-[1px] bg-borderColor" />
                <span className="absolute -bottom-1 -left-1 w-[1px] h-3/4 bg-borderColor" />
                <span className="absolute top-0 -translate-y-1/2 left-0 w-[1px] h-[0.707rem] rotate-45 bg-borderColor" />
                <span className="absolute bottom-0 translate-y-1/2 right-0 w-[1px] h-[0.707rem] rotate-45 bg-borderColor" />
              </span>
            </div>
          </div>
          <img
            src="/assets/images/ghost.png"
            alt="ghost"
            className="w-40 m-auto"
          />
        </div>
        <div className="lg:flex hidden text-[12px] opacity-70">
          <div className="w-[14.8vw] pl-[4vw]">
            <p>© 2025</p>
          </div>
          <div className="w-[66vw]">
            <p>ALL RIGHTS RESERVED BY HYDRAPAD.COM</p>
          </div>
        </div>
        <p className="lg:hidden block text-[12px] opacity-70 text-center">
          © 2025 ALL RIGHTS RESERVED BY HYDRAPAD.COM
        </p>
      </ContainerBig>
    </div>
  );
}
