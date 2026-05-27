import { buttonVariants } from "@/components/ui/button";
import Logo from "../logo";
import { cn } from "@/lib/utils";
import Link from "next/link";

function AboutCTA() {
  return (
    <section>
      <div className="bg-linear-to-tl from-primary/25 to-transparent rounded-xl bg-zinc-900 px-8 py-12 text-center text-white dark:text-black shadow-xs dark:bg-zinc-100">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Join <Logo size="md" /> and start sharing your voice.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-8 text-zinc-300 dark:text-zinc-800">
          Whether you write or read, Artpro gives you a simple place to explore
          ideas and connect with content that matters.
        </p>
        <div className="mt-8 grid sm:grid-cols-2 grid-cols-1 items-center gap-4 sm:w-100 mx-auto">
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "default", size: "xl" }))}
          >
            Join Artpro
          </Link>
          <Link
            href="/blog"
            className={cn(
              buttonVariants({ variant: "outline", size: "xl" }),
              "bg-transparent px-8 text-white hover:bg-white/5 hover:text-white border-white/20 dark:text-black dark:hover:bg-black/5 dark:hover:text-black dark:border-black/20"
            )}
          >
            Start reading today
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AboutCTA;
