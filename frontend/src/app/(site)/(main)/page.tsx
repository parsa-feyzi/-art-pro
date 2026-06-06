
import HomeLanding from "@/src/components/web/home-components/home-landing";
import HomeLatestArticles from "@/src/features/article/components/home-latest-articles";
import HomeMostViewedArticles from "@/src/features/article/components/home-most-viewed-articles";
import HomePopularArticles from "@/src/features/article/components/home-popular-articles";
import MainFeaturesContainer from "@/src/components/web/main-features-container";
import { Suspense } from "react";
import ArticleSliderSkeleton from "@/src/features/article/components/skeletons/article-slider-skeleton";
import MostActiveAuthorsSkeleton from "@/src/features/user/components/skeletons/most-active-authors-skeleton";
import HomeMostActiveAuthors from "@/src/features/user/components/most-active-authors";
import PopularArticlesSkeleton from "@/src/features/article/components/skeletons/popular-articles-skeleton";

export default function HomePage() {
  return (
    <div>
      {/* landing */}
      <HomeLanding />
      {/* main features */}
      <div className="lg:pt-28 md:pt-18 sm:pt-16 pt-14 ">
        <MainFeaturesContainer />
      </div>
      {/* latest articles */}
      <Suspense fallback={<ArticleSliderSkeleton />}>
        <HomeLatestArticles />
      </Suspense>
      {/* the most active authors */}
      <Suspense fallback={<MostActiveAuthorsSkeleton />}>
        <HomeMostActiveAuthors />
      </Suspense>
      {/* popular articles */}
      <Suspense fallback={<PopularArticlesSkeleton />}>
        <HomePopularArticles />
      </Suspense>
      {/* most viewed articles */}
      <Suspense fallback={<ArticleSliderSkeleton />}>
        <HomeMostViewedArticles />
      </Suspense>
    </div>
  );
}
