import { Suspense } from "react";
//
import HomeLanding from "@/src/components/web/home-components/home-landing";
import HomeLatestArticles from "@/src/features/article/components/home/home-latest-articles";
import HomeMostViewedArticles from "@/src/features/article/components/home/home-most-viewed-articles";
import HomePopularArticles from "@/src/features/article/components/home/home-popular-articles";
import MainFeaturesContainer from "@/src/features/about-us/components/main-features-container";
import ArticleSliderSkeleton from "@/src/features/article/components/skeletons/article-slider-skeleton";
import MostActiveAuthorsSkeleton from "@/src/features/user/components/skeletons/most-active-authors-skeleton";
import HomeMostActiveAuthors from "@/src/features/user/components/most-active-authors";
import PopularArticlesSkeleton from "@/src/features/article/components/skeletons/popular-articles-skeleton";
import HomeSection from "@/src/components/web/home-components/home-section";
import SectionTitle from "@/src/components/web/section-title";
import SocialFeaturesContainer from "@/src/features/about-us/components/social-features-container";
//

export default function HomePage() {
  return (
    <div className="w-screen">
      <div className="container p-container max-w-7xl mx-auto">
        {/* landing */}
        <HomeLanding />
        {/* latest articles */}
        <Suspense fallback={<ArticleSliderSkeleton />}>
          <HomeLatestArticles />
        </Suspense>
        {/* main features */}
        <HomeSection title={<SectionTitle secondaryWord="Main" mainWord="features" />}>
          <MainFeaturesContainer />
        </HomeSection>
        {/* popular articles */}
        <Suspense fallback={<PopularArticlesSkeleton />}>
          <HomePopularArticles />
        </Suspense>
        {/*  */}
        <HomeSection title={<SectionTitle secondaryWord="Built for" mainWord="Social Writing" />}>
          <SocialFeaturesContainer />
        </HomeSection>
        {/* most viewed articles */}
        <Suspense fallback={<ArticleSliderSkeleton />}>
          <HomeMostViewedArticles />
        </Suspense>
        {/* the most active authors */}
        <Suspense fallback={<MostActiveAuthorsSkeleton />}>
          <HomeMostActiveAuthors />
        </Suspense>
      </div>
    </div>
  );
}
