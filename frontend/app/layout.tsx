import type { Metadata } from "next";
import "./globals.css";
import AppProvider from "@/providers/app-provider";

export const metadata: Metadata = {
  title: {
    template: "%s | ArtPro",
    default: "ArtPro",
  },
  description: "Modern weblog for create advance articles",
  twitter: {
    card: "summary_large_image"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased overflow-x-hidden min-h-screen relative">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
