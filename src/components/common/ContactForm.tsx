import React from "react";
import LabelText from "./LabelText";
import CustomInput from "./CustomInput";
import CustomTextarea from "./CustomTextarea";
import { useAppDispatch } from "@/store/hooks";
import { closeDialog } from "@/store/reducers/dialog-slice";
import CloseButton from "./CloseButton";
import { useForm } from "@/hooks/useForm";
import { isFormValid } from "@/utils/func";
import { toastError, toastSuccess } from "@/utils/customToast";
import emailjs from "@emailjs/browser";

const ContactForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { form, handleChange } = useForm({
    name: "",
    email: "",
    discord: undefined,
    telegram: undefined,
    twitter: undefined,
    message: "",
  });

  const handleSubmit = () => {
    if (
      isFormValid({ name: form.name, email: form.email, message: form.message })
    ) {
      const obj = { ...form };
      if (!form.discord) delete obj.discord;
      if (!form.telegram) delete obj.telegram;
      if (!form.twitter) delete obj.twitter;
      emailjs
        .send(
          import.meta.env.VITE_EMAIL_SERVICE_ID,
          import.meta.env.VITE_EMAIL_TEMPLATE_ID,
          obj,
          import.meta.env.VITE_EMAIL_PUBLIC_KEY
        )
        .then((res) => {
          console.log("Email sent successfully!", res);
          toastSuccess("Email sent successfully!");
        })
        .catch((error) => {
          console.error("Failed to send email: ", error);
        });
      // sendEmail(form as EmailType);
    } else {
      toastError("Some info is invalid!");
    }
  };

  return (
    <div className="bg-lightColor px-10 py-5 w-full">
      <div className="flex justify-end">
        <CloseButton
          handleOpen={() => dispatch(closeDialog())}
          className="-mr-6 -mt-2"
        />
      </div>
      <h5 className="mb-5">CONTACT US</h5>
      <div className="mb-5">
        <LabelText>Your Contact Details</LabelText>
        <CustomInput
          className="mb-3"
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <CustomInput
          className="mb-3"
          placeholder="Telegram Handle (optional)"
          name="telegram"
          value={form.telegram}
          onChange={handleChange}
        />
        <CustomInput
          className="mb-3"
          placeholder="Discord Handle (optional)"
          name="discord"
          value={form.discord}
          onChange={handleChange}
        />
        <CustomInput
          className="mb-3"
          placeholder="Twitter Handle (optional)"
          name="twitter"
          value={form.twitter}
          onChange={handleChange}
        />
        <CustomInput
          className="mb-3"
          name="email"
          onChange={handleChange}
          placeholder="Email Address"
        />
      </div>
      <div className="mb-5">
        <LabelText>Message Box</LabelText>
        <CustomTextarea
          placeholder="Write Your Message"
          name="message"
          onChange={handleChange}
        />
      </div>
      <div className="w-full flex gap-2 justify-center">
        <button
          className="px-[30px] py-2 bg-green-500 text-white rounded-lg"
          onClick={handleSubmit}
        >
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
