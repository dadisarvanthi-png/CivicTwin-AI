import { toast } from "react-toastify";

export const successToast = (message) => {
  toast.success(message);
};

export const errorToast = (message) => {
  toast.error(message);
};

export const warningToast = (message) => {
  toast.warning(message);
};

export const infoToast = (message) => {
  toast.info(message);
};

// No loading toast in React Toastify
export const loadingToast = () => null;

// No update toast
export const updateToast = (id, message, type = "success") => {
  if (type === "success") {
    toast.success(message);
  } else {
    toast.error(message);
  }
};