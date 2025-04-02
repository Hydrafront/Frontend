import { ToastOptions } from "react-toastify";
import { toast } from "react-toastify";

export const toastSuccess = (message: string, options?: ToastOptions) => {
  toast.success(message, {
    autoClose: 3000,
    className: "bg-green-500 opacity-80 text-white cursor-pointer custom-toast",
    closeButton: false,
    progressClassName: "bg-white",
    ...options,
  });
};

export const toastError = (message: string, options?: ToastOptions) => {
  toast.error(message, {
    autoClose: 3000,
    className: "bg-red-500 opacity-80 text-white cursor-pointer custom-toast",
    closeButton: false,
    progressClassName: "bg-white",
    ...options,
  });
};
