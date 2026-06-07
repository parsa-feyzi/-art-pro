import { SignUpInfo } from "@/src/lib/types";
import { DefaultDBInfos } from "@/src/lib/types";

export type LoginInfo = Pick<SignUpInfo, "email" | "password">;

export type DBSignUpInfos = DefaultDBInfos & SignUpInfo

export interface AuthContextValue {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}