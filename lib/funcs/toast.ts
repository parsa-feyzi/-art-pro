import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export const successToast = (message: string, replace?: { path: string , await?: number}) => {
  toast.success(message, {
    style: {
      borderRadius: "10px",
      background: "#77777737",
      color: "#fff",
    },
  });
  if(replace && replace.await !== 0 && replace.path !== "") {
    setTimeout(() => redirect(replace.path), (replace.await || 2500));
  }
};
