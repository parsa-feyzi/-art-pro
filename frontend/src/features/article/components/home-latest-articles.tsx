
import { Article } from "@/src/lib/types";
import ArticlesSlider from "./articles-slider";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

async function HomeLatestArticles() {
  const resolve = await fetch(`${baseUrl}/api/articles`, {
    cache: "force-cache",
    next: { tags: ["articles_list"] },
  });
  let articles: Article[] = await resolve.json();
  articles = articles.slice(articles.length - 3, articles.length);

  return <ArticlesSlider title="Latest articles" dataList={articles} />;
}

export default HomeLatestArticles;
