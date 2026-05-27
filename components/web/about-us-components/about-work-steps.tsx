import { BookOpen, Feather, PenTool } from "lucide-react";
import AboutSection from "./about-section"
import AboutWorkStepBox from "./about-work-step-box";

const steps = [
  {
    icon: Feather,
    title: "Sign up",
    desc: "Create your account and join the Artpro community in seconds.",
  },
  {
    icon: PenTool,
    title: "Write & publish",
    desc: "Share your thoughts, stories, and expertise — solo or with co-authors.",
  },
  {
    icon: BookOpen,
    title: "Read & engage",
    desc: "Discover articles, save favorites, and interact with content and creators.",
  },
];

function AboutWorkSteps() {
  return (
    <AboutSection
        title="How Artpro Works"
        desc="A simple flow designed for both writers and readers."
      >
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <AboutWorkStepBox step={step} index={index} key={step.title} />
          ))}
        </div>
      </AboutSection>
  )
}

export default AboutWorkSteps