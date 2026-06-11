import { SearchParams } from "@/src/lib/types";
import BlogNotFoundSearch from "./blog-not-found-search";
import BlogBodyArticlesRenderer from "./blog-body-articles-renderer";
import ArticlesFilterHandler from "../../lib/articlesFilter";

interface Props {
  searchParams: SearchParams;
}

async function BlogBody({ searchParams }: Props) {
  const { title } = await searchParams;
  const filteredArticles = await ArticlesFilterHandler(title as string);

  return (
    <>
      {filteredArticles.length ? (
        <BlogBodyArticlesRenderer articles={filteredArticles} />
      ) : (
        <BlogNotFoundSearch />
      )}
    </>
  );
}

export default BlogBody;
