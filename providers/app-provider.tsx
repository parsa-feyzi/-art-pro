import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./theme-provider";
import ScrollToTop from "@/components/web/scroll-to-top";
import { Suspense } from "react";
import AuthProviderWrapper from "./auth-provider-wrapper";

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
