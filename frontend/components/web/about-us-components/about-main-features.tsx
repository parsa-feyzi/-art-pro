import MainFeaturesContainer from "../main-features-container";
import AboutSection from "./about-section";



function AboutMainFeatures() {
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

export default AboutMainFeatures;
