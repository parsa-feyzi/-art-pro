"use client";

import { AuthContext } from "@/src/features/auth/context/auth-context";

import { useMemo, useState } from "react";
import { AuthContextValue } from "../types/types";

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
