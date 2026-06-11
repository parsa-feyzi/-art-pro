import MainFeaturesContainer from "./main-features-container";
import { AboutSection } from "./about-section";

interface Props { hasBorder?: boolean }

export function AboutMainFeatures({ hasBorder }: Props) {
  return (
    <AboutSection
      title="Why Artpro?"
      desc="A platform designed to keep publishing simple and reading enjoyable."
      hasBorder={hasBorder}
    >
      <div className="mt-10">
        <MainFeaturesContainer />
      </div>
    </AboutSection>
  );
}
