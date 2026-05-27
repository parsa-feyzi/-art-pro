import ArticleSliderSkeleton from "@/components/skeleton/home-skeletons/article-slider-skeleton";
import MostActiveAuthorsSkeleton from "@/components/skeleton/home-skeletons/most-active-authors-skeleton";
import PopularArticlesSkeleton from "@/components/skeleton/home-skeletons/popular-articles-skeleton";
import HomeLanding from "@/components/web/home-components/home-landing";
import HomeLatestArticles from "@/components/web/home-components/home-latest-articles";
import HomeMostActiveAuthors from "@/components/web/home-components/home-most-active-authors";
import HomeMostViewedArticles from "@/components/web/home-components/home-most-viewed-articles";
import HomePopularArticles from "@/components/web/home-components/home-popular-articles";
import MainFeaturesContainer from "@/components/web/main-features-container";
import { Suspense } from "react";

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
