import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./theme-provider";
import ScrollToTop from "@/src/components/web/scroll-to-top";
import { Suspense } from "react";
import AuthProviderWrapper from "../features/article/providers/auth-provider-wrapper";
// import { AuthProviderWrapper } from "@/src/features/auth";

interface Props {
  children: Readonly<React.ReactNode>;
}

async function AppProvider({ children }: Props) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Suspense fallback={<main>{children}</main>}>
        <AuthProviderWrapper>
          <main>
            {children}
            <Toaster position="bottom-right" reverseOrder={false} />
          </main>
          {/* Out of DOM three */}
          <ScrollToTop />
        </AuthProviderWrapper>
      </Suspense>
    </ThemeProvider>
  );
}

export default AppProvider;
