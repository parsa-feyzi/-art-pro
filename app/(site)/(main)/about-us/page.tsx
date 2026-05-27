import AboutHero from "@/components/web/about-us-components/about-hero";
import AboutStatistics from "@/components/web/about-us-components/about-statistics";
import AboutWhatIsThisSite from "@/components/web/about-us-components/about-what-is-this-site";
import AboutCTA from "@/components/web/about-us-components/about-CTA";
import AboutForWritersReaders from "@/components/web/about-us-components/about-for-writers-readers";
import AboutSocialFeatures from "@/components/web/about-us-components/about-social-features";
import AboutMainFeatures from "@/components/web/about-us-components/about-main-features";
import AboutWorkSteps from "@/components/web/about-us-components/about-work-steps";
//

function AboutUsPage() {
  return (
    <main className="min-h-screen">
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
    </main>
  );
}

export default AboutUsPage;
