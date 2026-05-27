import MainProvider from "@/providers/main-provider";

interface Props {
  children: React.ReactNode;
}

function MainLayout({ children }: Props) {
  return (
    <MainProvider>
      {children}
    </MainProvider>
  );
}

export default MainLayout;
