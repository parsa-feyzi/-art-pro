import { Heart, Mail, PhoneCall } from "lucide-react";
import TowContentSeparator from "../../ui/tow-content-separator";
import Logo from "../logo";
import FooterInfoPad from "./footer-info-pad";
import ShutterStickyPattern from "../shutter-sticky-pattern/shutter-sticky-pattern";
import FooterNavigationGroup from "./footer-navigation-group";
import { Article } from "@/src/lib/types";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

const usefulReferencesLinks = [
  { label: "Blog", href: "/blog" },
  { label: "About us", href: "/about-us" },
  { label: "Create article", href: "/dashboard" },
];

async function Footer() {
  const resolve = await fetch(`${baseUrl}/api/articles`, {
    cache: "force-cache",
    next: { tags: ["articles_list"] },
  });
  let articles: Article[] = await resolve.json();
  articles = articles.slice(articles.length - 4, articles.length);

  const studyProposal = articles.map(({ title, _id }) => ({
    label: title,
    href: `/blog/${_id}`,
  }));

  return (
    <footer className="bg-background relative z-10 lg:mt-40 md:mt-34 mt-52 border-t-2 border-input/60 overflow-hidden">
      <div className="container max-w-7xl mx-auto pt-16 lg:px-8 md:px-6 px-4">
        <div className="grid grid-cols-7 gap-x-6 gap-y-16">
          <div className="lg:col-span-3 col-span-7">
            <div className="flex sm:justify-start justify-center">
              <Logo size="md" />
            </div>
            <p className="sm:mt-10 mt-6 max-w-5/6 text-muted-foreground leading-7 line-clamp-5 md:text-base text-sm sm:text-left text-center sm:mx-0 mx-auto">
              Welcome to Artpro a space where curiosity meets creativity. Our
              mission is simple: to inspire, inform, and empower readers through
              authentic stories, thoughtful insights, and practical tips that
              make everyday life a little brighter. Founded by passionate
              writers and lifelong learners, Artpro dives deep into topics that
              matter from to helpful guides you can actually use.
            </p>
            <div>
              <TowContentSeparator
                firstData={
                  <FooterInfoPad label={<Mail className="size-4.5 translate-y-0.5" />} info="artpro@gmail.com" />
                }
                lastData={<FooterInfoPad label={<PhoneCall className="size-4.5 translate-y-0.5" />} info="+912 458 8569" />}
                className="mt-16 sm:justify-start justify-center sm:translate-x-0 -translate-x-2 md:flex! hidden!"
              />
              <TowContentSeparator
                firstData={
                  <FooterInfoPad label={<Mail className="size-4"/>} info="artpro@gmail.com" />
                }
                lastData={<FooterInfoPad label={<PhoneCall className="size-4"/>} info="+912 458 8569" />}
                size="sm"
                className="mt-16 sm:justify-start justify-center sm:translate-x-0 -translate-x-2 md:hidden! flex!"
              />
            </div>
          </div>
          <div className="lg:col-span-4 col-span-7 sm:flex grid grid-cols-2 px-2 sm:gap-24 gap-8">
            <FooterNavigationGroup
              title="Useful References"
              links={usefulReferencesLinks}
            />
            <FooterNavigationGroup
              title="Study Proposal"
              links={studyProposal}
            />
          </div>
        </div>
        <div className="border-t border-input text-tertiary lg:mt-16 mt-20 py-6 flex justify-center items-center lg:text-sm text-xs">
          <div>
            Made with{" "}
            <Heart className="size-4 -translate-y-0.5 inline-block text-primary opacity-60" />{" "}
            for the knowledge community by <i>Parsa Fayzi</i>
          </div>
        </div>
      </div>
      <ShutterStickyPattern className="lg:-top-130 -top-222 right-0 -rotate-45 h-[250%] -z-10 md:opacity-50 opacity-30" />
    </footer>
  );
}

export default Footer;
