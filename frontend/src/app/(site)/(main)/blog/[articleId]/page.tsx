import ArticlePageHead from "@/src/features/article/components/article-page-head";
import delay from "@/src/lib/funcs/delay";
import { Article } from "@/src/lib/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

interface Props {
  params: Promise<{ articleId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { articleId } = await params;
  const resolve = await fetch(`${baseUrl}/api/articles/${articleId}`, {
    cache: "force-cache",
  });
  const article: Article = await resolve.json();
  return {
    title: {
      absolute: article.title,
    },
    description: article.content,
  };
}

export async function generateStaticParams(): Promise<{ articleId: string }[]> {
  const resolve = await fetch(`${baseUrl}/api/articles`, {
    cache: "force-cache",
  });
  const articles: Article[] = await resolve.json();

  return articles.map((article) => ({ articleId: article._id.toString() }));
}

async function ArticlePage({ params }: Props) {
  const { articleId } = await params;
  const resolve = await fetch(`${baseUrl}/api/articles/${articleId}`, {
    cache: "force-cache",
    next: { tags: ["one_article"] },
  });
  const article: Article = await resolve.json();

  if (resolve.status === 404) notFound();

  // await delay(2000);

  return (
    <main>
      <ArticlePageHead {...article} />
      <p className="leading-8">{article.content}</p>
    </main>
  );
}

export default ArticlePage;
