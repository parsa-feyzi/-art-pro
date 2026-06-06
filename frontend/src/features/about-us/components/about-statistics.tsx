import Collapsible from "@/src/components/ui/collapsible";
import { AboutStatisticBox } from "./about-statistic-box";

const stats = [
  { label: "Articles Published", value: 10000 },
  { label: "Active Writers", value: 20000 },
  { label: "Daily Readers", value: 50000 },
];

export function AboutStatistics() {
  return (
    <section className="pb-8">
      <Collapsible gap={6}>
        {stats.map((stat) => (
          <AboutStatisticBox {...stat} key={stat.label} />
        ))}
      </Collapsible>
    </section>
  )
}