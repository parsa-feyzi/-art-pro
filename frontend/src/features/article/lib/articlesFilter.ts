import { Article } from "@/src/lib/types";
import { cacheLife } from "next/cache";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

export default async function ArticlesFilterHandler(title: string): Promise<Article[]> {
  "use cache: private";
  cacheLife("hours");

  const resolve = await fetch(`${baseUrl}/api/articles`, {
    cache: "force-cache",
    next: { tags: ["articles_list"] },
  });
  const articles: Article[] = await resolve.json();

  if (!title) {
    return articles;
  }

  return articles.filter((article) =>
    article.title?.toLowerCase().includes((title as string)?.toLowerCase())
  );
}
