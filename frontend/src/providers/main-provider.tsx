import Navbar from "@/src/components/web/navbar-components/navbar";
import { SidebarProvider } from "../components/ui/sidebar";
import MainSidebar from "../components/web/sidebar-components/main-sidebar";


interface Props {
  children: React.ReactNode;
}

function MainProvider({ children }: Props) {
  return (
    <SidebarProvider>
        <section>
          <Navbar />
          <MainSidebar />
          <section className="sm:pt-12 pt-32">
            {children}
          </section>
        </section>
    </SidebarProvider>
  );
}

export default MainProvider;