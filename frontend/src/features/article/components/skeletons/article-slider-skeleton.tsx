import Collapsible from "@/src/components/ui/collapsible";
import ArticleBoxSkeleton from "./article-box-skeleton";
import HomeSection from "@/src/components/web/home-components/home-section";
import Skeleton from "@/src/components/ui/skeleton";

function ArticleSliderSkeleton() {
  return (
    <HomeSection title={<Skeleton className="md:h-10 md:w-80 sm:h-8 sm:w-72 h-6 w-64" />}>
      <Collapsible>
        <ArticleBoxSkeleton className="lg:flex hidden" />
        <ArticleBoxSkeleton className="sm:flex hidden" />
        <ArticleBoxSkeleton />
      </Collapsible>
    </HomeSection>
  );
}

export default ArticleSliderSkeleton;
