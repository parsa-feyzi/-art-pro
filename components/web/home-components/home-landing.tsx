import HomeLandingSearchBox from "./home-landing-search-box";
import CrookedArrow from "@/components/ui/crooked-arrow";
import HomeLandingLogo from "./home-landing-logo";
import { Suspense } from "react";
import HomeLandingSearchBoxSkeleton from "@/components/skeleton/home-skeletons/home-landing-search-box-skeleton";

function HomeLanding() {
  return (
    <section className="relative md:pt-16 sm:pt-12 pt-8 lg:pb-32 md:pb-24 sm:pb-20 pb-18 border-b border-b-input">
      <div className="lg:text-7xl sm:text-5xl text-4xl font-bold text-center lg:leading-22 sm:leading-16 leading-14">
        Write your articles in <HomeLandingLogo /> and read others articles
      </div>
      <CrookedArrow className="md:block hidden lg:left-20 lg:bottom-15 left-0 bottom-10 rotate-45" />
      <CrookedArrow className="md:block hidden lg:right-20 lg:bottom-45 right-0 bottom-35 -rotate-135" />
      <Suspense fallback={<HomeLandingSearchBoxSkeleton />}>
        <HomeLandingSearchBox />
      </Suspense>
    </section>
  );
}

export default HomeLanding;
