import { Article } from "@/lib/types";
import ArticlesSlider from "./articles-slider";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

async function HomeMostViewedArticles() {
  const resolve = await fetch(`${baseUrl}/api/articles`, {
    cache: "force-cache",
    next: { tags: ["articles_list"] },
  });
  let articles: Article[] = await resolve.json();
  articles = articles.slice(articles.length - 3, articles.length);

  return <ArticlesSlider title="Most viewed articles" dataList={articles} />;
}

export default HomeMostViewedArticles;
