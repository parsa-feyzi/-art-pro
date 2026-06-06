import { AuthContextValue } from "@/lib/types";
import { createContext, useContext } from "react";

// context
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// hook
function useAuthContext() {
  const contextValue = useContext(AuthContext);
  if (!contextValue)
    throw new Error("useAuthContext must be used within AuthProvider");
  return contextValue;
}

export { AuthContext, useAuthContext };
