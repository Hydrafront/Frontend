import { EmailType } from "@/interfaces/types";
import axios from "axios";
import { toastSuccess } from "@/utils/customToast";

const BASE_URL_OTHER = `${import.meta.env.VITE_SERVER_URL}/api/other`;

export const sendEmail = async (data: EmailType) => {
  try {
    const res = await axios.post(`${BASE_URL_OTHER}/send-email`, data);
    toastSuccess(res.data.message);
  } catch (error) {
    console.log(error);
  }
};
