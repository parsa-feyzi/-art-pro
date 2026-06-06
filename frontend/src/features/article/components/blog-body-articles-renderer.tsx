import { Article } from "@/src/lib/types";
import ArticleBox from "./article-box";
import { memo } from "react";
import Collapsible from "@/src/components/ui/collapsible";

interface Props {
  articles: Article[];
}

const BlogBodyArticlesRenderer = memo(({ articles }: Props) => {
  return (
    <Collapsible>
      {articles.map((article) => (
        <ArticleBox key={article._id} {...article} />
      ))}
    </Collapsible>
  );
});

export default BlogBodyArticlesRenderer;
