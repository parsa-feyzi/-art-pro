import Navbar from "@/src/components/web/navbar-components/navbar";
import ArticleSearchProvider from "../features/article/providers/article-search-provider";


interface Props {
  children: React.ReactNode;
}

function MainProvider({ children }: Props) {
  return (
    <ArticleSearchProvider>
      <section>
        <Navbar />
        <section className="sm:pt-12 pt-24">{children}</section>
      </section>
    </ArticleSearchProvider>
  );
}

export default MainProvider;
