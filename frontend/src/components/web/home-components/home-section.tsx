import { cn } from "@/src/lib/utils";
import { Activity } from "react";
import HomeSectionHeader from "./home-section-header";

type Props = Record<"title" | "children", React.ReactNode> & { actions?: React.ReactNode }

function HomeSection({ title, actions, children }: Props) {
  return (
    <section className="md:pt-44 sm:pt-40 pt-36 w-full overflow-hidden">
      <HomeSectionHeader title={title} actions={actions} />
      {children}
    </section>
  );
}

export default HomeSection;
