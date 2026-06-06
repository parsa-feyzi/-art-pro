
import BlogBody from "@/src/features/article/components/blog-body";
import BlogHeader from "@/src/features/article/components/blog-header";
import ArticleBodySkeleton from "@/src/features/article/components/skeletons/blog-body-skeleton";
import BlogHeaderSkeleton from "@/src/features/article/components/skeletons/blog-header-skeleton";
import { SearchParams } from "@/src/lib/types";
import { Metadata } from "next";
import { Suspense } from "react";

interface Props {
  searchParams: SearchParams;
}

export const metadata: Metadata = {
  title: "Blog",
  description: "Weblog page, articles collection",
};

function BlogPage({ searchParams }: Props) {
  return (
    <main className="min-h-[calc(100vh-100px)]">
      <Suspense fallback={<BlogHeaderSkeleton />}>
        <BlogHeader />
      </Suspense>
      <Suspense fallback={<ArticleBodySkeleton />}>
        <BlogBody searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

export default BlogPage;
