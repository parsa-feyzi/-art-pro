import Collapsible from "@/src/components/ui/collapsible";
import { Article } from "@/src/lib/types";
import HomeSection from "../../../../components/web/home-components/home-section";
import ArticleBox from "../article-box";
import { ArrowRight, MoveRight } from "lucide-react";
import Link from "next/link";
import SectionTitle from "@/src/components/web/section-title";


const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

async function HomePopularArticles() {
  const resolve = await fetch(`${baseUrl}/api/articles`, {
    cache: "force-cache",
    next: { tags: ["articles_list"] },
  });
  let articles: Article[] = await resolve.json();

  articles = articles.sort((a, b) => a.views - b.views).slice(0, 9)

  return (
    <HomeSection title={<SectionTitle secondaryWord="Popular" mainWord="articles" />} actions={
      <Link href="/blog" className="flex font-bold hover:text-primary transition-all duration-200 items-center gap-1.5 text-xs">
        All Articles
        {/* <ArrowRight /> */}
        <MoveRight className="h-5! w-5! translate-y-0.5" />
      </Link>
    } >
      <Collapsible>
        {articles.map((article) => (
            <ArticleBox {...article} key={article._id} />
          ))}
      </Collapsible>
    </HomeSection>
  );
}

export default HomePopularArticles;
