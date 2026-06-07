import MainFeaturesContainer from "../../../components/web/main-features-container";
import { AboutSection } from "./about-section";



export function AboutMainFeatures() {
  return (
    <AboutSection
      title="Why Artpro?"
      desc="A platform designed to keep publishing simple and reading enjoyable."
      hasBorder
    >
      <div className="mt-10">
        <MainFeaturesContainer />
      </div>
    </AboutSection>
  );
}
