import { AboutSection } from "./about-section"
import SocialFeaturesContainer from "./social-features-container"

export function AboutSocialFeatures() {
  return (
    <AboutSection
        title="Built for Social Writing"
        desc="Artpro is not just a publishing tool — it’s a connected space for following creators and writing together."
      >
        <div className="mt-10">
          <SocialFeaturesContainer />
        </div>
      </AboutSection>
  )
}