import BlogBody from "@/components/web/blog-components/blog-body";
import BlogHeader from "@/components/web/blog-components/blog-header";
import ArticleBodySkeleton from "@/components/skeleton/blog-skeletons/blog-body-skeleton";
import { SearchParams } from "@/lib/types";
import { Metadata } from "next";
import { Suspense } from "react";

interface Props { searchParams: SearchParams }

export const metadata: Metadata = {
  title: "Blog",
  description: "Weblog page, articles collection"
}

function BlogPage({ searchParams }: Props) {
  return (
    <main className="min-h-[calc(100vh-100px)]">
      <BlogHeader />
      <Suspense fallback={<ArticleBodySkeleton />}>
        <BlogBody searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

export default BlogPage;
