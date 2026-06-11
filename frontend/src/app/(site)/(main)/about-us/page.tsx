import { AboutCTA } from "@/src/features/about-us/components/about-CTA";
import { AboutForWritersReaders } from "@/src/features/about-us/components/about-for-writers-readers";
import { AboutHero } from "@/src/features/about-us/components/about-hero";
import { AboutMainFeatures } from "@/src/features/about-us/components/about-main-features";
import { AboutSocialFeatures } from "@/src/features/about-us/components/about-social-features";
import { AboutStatistics } from "@/src/features/about-us/components/about-statistics";
import { AboutWhatIsThisSite } from "@/src/features/about-us/components/about-what-is-this-site";
import { AboutWorkSteps } from "@/src/features/about-us/components/about-work-steps";



function AboutUsPage() {
  return (
    <main className="min-h-screen w-screen">
      <div className="container p-container max-w-7xl mx-auto">
        {/* Hero */}
        <AboutHero />
        {/* Stats */}
        <AboutStatistics />
        {/* What is Artpro */}
        <AboutWhatIsThisSite />
        {/* How it works */}
        <AboutWorkSteps />
        {/* Why Artpro */}
        <AboutMainFeatures />
        {/* Social & Collaboration */}
        <AboutSocialFeatures />
        {/* Writers & Readers */}
        <AboutForWritersReaders />
        {/* CTA */}
        <AboutCTA />
      </div>
    </main>
  );
}

export default AboutUsPage;
