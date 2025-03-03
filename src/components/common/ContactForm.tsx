import React from "react";
import LabelText from "./LabelText";
import CustomInput from "./CustomInput";
import CustomTextarea from "./CustomTextarea";
import { useAppDispatch } from "@/store/hooks";
import { closeDialog } from "@/store/reducers/dialog-slice";
import CloseButton from "./CloseButton";

const ContactForm: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="bg-lightColor px-10 py-5 w-full">
      <div className="flex justify-end">
        <CloseButton handleOpen={() => dispatch(closeDialog())} className="-mr-6 -mt-2" />
      </div>
      <h5 className="mb-5">CONTACT US</h5>
      <div className="mb-5">
        <LabelText>Your Contact Details</LabelText>
        <CustomInput className="mb-3" placeholder="Name" />
        <CustomInput className="mb-3" placeholder="Telegram Handle" />
        <CustomInput className="mb-3" placeholder="Discord Handle" />
        <CustomInput className="mb-3" placeholder="Twitter Handle (optional)" />
        <CustomInput className="mb-3" placeholder="Email Address" />
      </div>
      <div className="mb-5">
        <LabelText>Message Box</LabelText>
        <CustomTextarea placeholder="Write Your Message" />
      </div>
      <div className="w-full flex gap-2 justify-center">
        <button className="px-[30px] py-2 bg-green-500 text-white rounded-lg">
          SUBMIT
        </button>
        <button
          className="px-[30px] py-2 border border-gray-400 text-white rounded-lg"
          onClick={() => dispatch(closeDialog())}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default ContactForm;
