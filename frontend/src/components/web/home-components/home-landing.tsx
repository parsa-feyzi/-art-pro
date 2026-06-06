import HomeLandingSearchBox from "../../../features/article/components/home-landing-search-box";
import CrookedArrow from "@/src/components/ui/crooked-arrow";
import HomeLandingLogo from "./home-landing-logo";
import { Suspense } from "react";
import HomeLandingSearchBoxSkeleton from "@/src/features/article/components/skeletons/home-landing-search-box-skeleton";


function HomeLanding() {
  return (
    <section className="relative md:pt-12 sm:pt-8 pt-8 lg:pb-32 md:pb-24 sm:pb-20 pb-18 border-b border-b-input">
      <h1 className="lg:text-7xl sm:text-5xl text-4xl sm:font-bold font-extrabold text-center lg:leading-22 sm:leading-16 leading-14">
        Write your articles in <HomeLandingLogo /> and read others articles
      </h1>
      <CrookedArrow className="md:block hidden lg:left-20 lg:bottom-15 left-0 bottom-10 rotate-45" />
      <CrookedArrow className="md:block hidden lg:right-20 lg:bottom-45 right-0 bottom-35 -rotate-135" />
      <Suspense fallback={<HomeLandingSearchBoxSkeleton />}>
        <HomeLandingSearchBox />
      </Suspense>
    </section>
  );
}

export default HomeLanding;
