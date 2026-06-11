import Collapsible from "@/src/components/ui/collapsible";
import { AboutBox } from "./boxes/about-box";
import { LayoutGrid, Zap } from "lucide-react";
import { AboutBoxList } from "./boxes/about-box-list";
import { MissionOrVisionBox } from "./boxes/mission-or-vision-box";
import IconBox from "@/src/components/ui/icon-box";

const whatIsArtpro = [
  "Share ideas, tutorials, thoughts, and stories.",
  "Follow inspiring writers and let others follow your work.",
  "Collaborate on articles with other authors and publish together.",
];

export function AboutWhatIsThisSite() {
  return (
    <section className="py-16">
      <Collapsible itemsNumber={2} gap={8}>
        <AboutBox
          title="What is Artpro?"
          icon={
            <IconBox>
              <LayoutGrid className="h-6 w-6 text-primary" />
            </IconBox>
          }
        >
          <p className="mt-4 leading-7 text-muted-foreground">
            Artpro is a clean and open content platform built for writers and
            readers. Anyone can sign up, publish articles, and explore content
            from a diverse community of creators.
          </p>
          <AboutBoxList list={whatIsArtpro} />
        </AboutBox>
        <AboutBox
          title="Mission & Vision"
          icon={
            <IconBox>
              <Zap className="h-6 w-6 text-primary" />
            </IconBox>
          }
        >
          <Collapsible gap={6} itemsNumber={2} className="mt-6">
            <MissionOrVisionBox
              title="Mission"
              content="Empower writers to publish their ideas easily and connect them
                  with readers who value quality content."
            />
            <MissionOrVisionBox
              title="Vision"
              content="Build an open space where learning, writing, and sharing can
                  grow into a strong creative community."
            />
          </Collapsible>
        </AboutBox>
      </Collapsible>
    </section>
  );
}
