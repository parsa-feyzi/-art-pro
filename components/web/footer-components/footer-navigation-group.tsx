import { cn } from "@/lib/utils";
import Link from "next/link";
import { ClassNameValue } from "tailwind-merge";

interface Props {
  title: string;
  links: { label: string; href: string }[];
  className?: ClassNameValue
}

function FooterNavigationGroup({ title, links, className }: Props) {
  return (
    <div className={cn("", className)}>
      <div className="sm:text-xl text-base font-bold relative pb-2 sm:text-start text-center line-clamp-1">
        {title}
        <span className="inline-block w-full absolute bottom-0 left-0 sm:h-0.5 h-px rounded-full bg-primary"></span>
      </div>
      <div className="flex flex-col sm:gap-6 sm:mt-10 gap-4 mt-6">
          {links.map(({ label, href }) => (
            <div key={href} className="flex items-center gap-2">
                <span className="block w-2 h-0.5 translate-y-0.5 bg-primary"></span>
                <Link href={href} className="font-medium text-muted-foreground sm:text-base text-sm line-clamp-1 hover:ps-1 hover:text-primary transition-all duration-200" >{label}</Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default FooterNavigationGroup;
