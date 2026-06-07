import Skeleton from "@/src/components/ui/skeleton";
import { Activity } from "react";
import AuthInputSkeleton from "./auth-input-skeleton";

interface Props {
  inputItems: 2 | 4;
}

function AuthFormSkeleton({ inputItems }: Props) {
  return (
    <div>
      <Activity mode={inputItems === 2 ? "visible" : "hidden"}>
        <AuthInputSkeleton />
        <AuthInputSkeleton />
      </Activity>
      <Activity mode={inputItems === 4 ? "visible" : "hidden"}>
        <AuthInputSkeleton />
        <AuthInputSkeleton />
        <AuthInputSkeleton />
        <AuthInputSkeleton />
      </Activity>
      <Skeleton className="h-9 mt-6" />
    </div>
  );
}

export default AuthFormSkeleton;
