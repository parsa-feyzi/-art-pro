import Collapsible from "@/components/ui/collapsible";
import { Article } from "@/lib/types";
import HomeSection from "./home-section";
import ArticleBox from "../article-box";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

async function HomePopularArticles() {
  const resolve = await fetch(`${baseUrl}/api/articles`, {
    cache: "force-cache",
    next: { tags: ["articles_list"] },
  });
  const articles: Article[] = await resolve.json();

  return (
    <HomeSection title="Popular articles">
      <Collapsible>
        {articles
          .sort((a, b) => a.views - b.views)
          .slice(0, 9)
          .map((article) => (
            <ArticleBox {...article} key={article._id} />
          ))}
      </Collapsible>
    </HomeSection>
  );
}

export default HomePopularArticles;
