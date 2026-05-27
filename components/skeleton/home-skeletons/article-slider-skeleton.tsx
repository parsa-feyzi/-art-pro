import Collapsible from "@/components/ui/collapsible";
import ArticleBoxSkeleton from "../blog-skeletons/article-box-skeleton";
import HomeSection from "@/components/web/home-components/home-section";
import Skeleton from "@/components/ui/skeleton";

function ArticleSliderSkeleton() {
  return (
    <HomeSection title={<Skeleton className="md:h-10 md:w-80 sm:h-8 sm:w-72 h-6 w-64" />}>
      <Collapsible>
        <ArticleBoxSkeleton />
        <ArticleBoxSkeleton />
        <ArticleBoxSkeleton />
      </Collapsible>
    </HomeSection>
  );
}

export default ArticleSliderSkeleton;
