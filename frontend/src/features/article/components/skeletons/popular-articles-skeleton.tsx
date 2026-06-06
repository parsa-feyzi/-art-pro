import Collapsible from "@/src/components/ui/collapsible";
import ArticleBoxSkeleton from "./article-box-skeleton";
import HomeSection from "@/src/components/web/home-components/home-section";
import Skeleton from "@/src/components/ui/skeleton";

function PopularArticlesSkeleton() {
  return (
    <HomeSection title={<Skeleton className="md:h-10 md:w-64 sm:h-8 sm:w-60 h-6 w-56" />}>
      <Collapsible>
        <ArticleBoxSkeleton />
        <ArticleBoxSkeleton />
        <ArticleBoxSkeleton />
        <ArticleBoxSkeleton />
        <ArticleBoxSkeleton />
        <ArticleBoxSkeleton />
        <ArticleBoxSkeleton />
        <ArticleBoxSkeleton />
        <ArticleBoxSkeleton />
      </Collapsible>
    </HomeSection>
  );
}

export default PopularArticlesSkeleton;
