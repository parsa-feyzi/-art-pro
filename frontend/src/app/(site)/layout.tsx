import SiteProvider from "@/src/providers/site-provider";

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <SiteProvider>
      {children}
    </SiteProvider>
  );
}
