"use client";
import { AuthContext } from "@/contexts/auth-context";
import { AuthContextValue } from "@/lib/types";
import { useMemo, useState } from "react";

interface Props {
  children: React.ReactNode;
  initialValue: boolean;
}

function AuthProvider({ children, initialValue }: Props) {
  const [isLogin, setIsLogin] = useState(initialValue);

  const value: AuthContextValue = useMemo(
    () => ({
      isLogin,
      setIsLogin,
    }),
    [isLogin]
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}

export default AuthProvider;
