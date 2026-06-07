import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export const successToast = (message: string, replace?: { path: string , await?: number}) => {
  toast.success(message, {
    style: {
      borderRadius: "10px",
      background: "#171717",
      color: "#fff",
    },
  });
  if(replace && replace.await !== 0 && replace.path !== "") {
    setTimeout(() => redirect(replace.path), (replace.await || 3000));
  }
};

export const errorToast = (message: string, replace?: { path: string , await?: number}) => {
  toast.error(message, {
    style: {
      borderRadius: "10px",
      background: "#171717",
      color: "#fff",
    },
  });
  if(replace && replace.await !== 0 && replace.path !== "") {
    setTimeout(() => redirect(replace.path), (replace.await || 3000));
  }
};
