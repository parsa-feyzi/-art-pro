import { buttonVariants } from "@/src/components/ui/button"
import ShutterStickyPattern from "../../../components/web/shutter-sticky-pattern/shutter-sticky-pattern"
import Link from "next/link"

export function AboutHero() {
  return (
    <section>
        <div className="pb-24 md:pb-32 md:pt-6 pt-4">
          <div className="text-center">
            <div className="relative overflow-hidden mb-12 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
              <span className="dark:text-green-100 text-green-900">About Artpro</span>
              <ShutterStickyPattern className="h-[1500%] -z-10 scale-20 -rotate-135 -top-62 -left-56 opacity-100 dark:opacity-100" />
            </div>
            <h2 className="text-5xl font-bold tracking-tight leading-14 md:text-6xl">
              Where <span className="text-primary">ideas</span> become articles.
            </h2>
            <p className="mx-auto mt-10 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
              Artpro is an open blogging platform where writers can publish
              their ideas, share knowledge, and build a meaningful audience —
              while readers discover stories that inform, inspire, and stay with
              them.
            </p>
            <div className="mt-16 grid sm:grid-cols-2 grid-cols-1 items-center gap-6 sm:w-100 w-10/12 mx-auto">
              <Link
                href="/dashboard"
                className={buttonVariants({ size: "xl" })}
              >
                Start Writing
              </Link>
              <Link
                href="/blog"
                className={buttonVariants({ variant: "outline", size: "xl" })}
              >
                Explore Articles
              </Link>
            </div>
          </div>
        </div>
      </section>
  )
}