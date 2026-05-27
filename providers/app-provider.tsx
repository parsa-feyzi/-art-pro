import { Toaster } from "react-hot-toast"
import { ThemeProvider } from "./theme-provider"
import ScrollToTop from "@/components/web/scroll-to-top"
import AuthProvider from "./auth-provider"
import { cookies } from "next/headers"

interface Props {
    children: Readonly<React.ReactNode>
}

async function AppProvider({ children }: Props) {
    const cookieStor = await cookies();
    const tokenValue = cookieStor.get("token")?.value;
    const initialAuthState = tokenValue ? true : false

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <AuthProvider initialValue={initialAuthState} >
                <main>
                    {children}
                    <Toaster position="bottom-right" reverseOrder={false} />
                </main>
                {/* Out of DOM three */}
                <ScrollToTop />
            </AuthProvider>
        </ThemeProvider>
    )
}

export default AppProvider