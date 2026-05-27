import { Article, SearchParams } from "@/lib/types";
import BlogNotFoundSearch from "./blog-not-found-search";
import BlogBodyArticlesRenderer from "./blog-body-articles-renderer";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

interface Props {
  searchParams: SearchParams;
}

async function BlogBody({ searchParams }: Props) {
  const resolve = await fetch(`${baseUrl}/api/articles`, {
    cache: "force-cache",
    next: { tags: ["articles_list"] },
  });
  const articles: Article[] = await resolve.json();

  const { title } = await searchParams;
  // await delay(2000)
  return (
    <>
      {!title ||
      articles.find((article) =>
        article.title?.toLowerCase().includes((title as string)?.toLowerCase())
      ) ? (
        <BlogBodyArticlesRenderer articles={articles} title={title} />
      ) : (
        <BlogNotFoundSearch />
      )}
    </>
  );
}

export default BlogBody;
