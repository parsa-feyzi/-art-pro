import Navbar from "@/src/components/web/navbar-components/navbar";
import ArticleSearchProvider from "../features/article/providers/article-search-provider";
import { SidebarProvider } from "../components/ui/sidebar";
import MainSidebar from "../components/web/sidebar-components/main-sidebar";


interface Props {
  children: React.ReactNode;
}

function MainProvider({ children }: Props) {
  return (
    <SidebarProvider>
      <ArticleSearchProvider>
        <section>
          <Navbar />
          <MainSidebar />
          <section className="sm:pt-12 pt-32">
            {children}
          </section>
        </section>
      </ArticleSearchProvider>
    </SidebarProvider>
  );
}

export default MainProvider;