import Collapsible from "@/components/ui/collapsible";
import AboutForWritersReadersBox from "./about-for-writers-readers-box";

function AboutForWritersReaders() {
  return (
    <section className="py-16">
      <Collapsible itemsNumber={2} gap={6}>
        <AboutForWritersReadersBox
          title="For Writers"
          content="Create, publish, collaborate with co-authors, and grow your
              audience through follows and community engagement."
        />
        <AboutForWritersReadersBox
          title="For Readers"
          content="Discover new articles, follow writers you love, and stay updated
              with content from creators and collaborative teams."
        />
      </Collapsible>
    </section>
  );
}

export default AboutForWritersReaders;
