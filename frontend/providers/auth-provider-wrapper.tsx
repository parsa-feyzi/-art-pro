import { cookies } from "next/headers";
import AuthProvider from "./auth-provider";

interface Props {
    children: React.ReactNode
}

async function AuthProviderWrapper({ children }: Props) {
    const cookieStor = await cookies();
    const tokenValue = cookieStor.get("token")?.value;
    const initialAuthState = tokenValue ? true : false;
  
    return (
      <AuthProvider initialValue={initialAuthState}>{children}</AuthProvider>
    );
  }

export default AuthProviderWrapper