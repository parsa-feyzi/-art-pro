
import BlogBody from "@/src/features/article/components/blog/blog-body";
import BlogHeader from "@/src/features/article/components/blog/blog-header";
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
    <main className="min-h-[calc(100vh-100px)] w-screen">
      <div className="container p-container max-w-7xl mx-auto">
        <Suspense fallback={<BlogHeaderSkeleton />}>
          <BlogHeader />
        </Suspense>
        <Suspense fallback={<ArticleBodySkeleton />}>
          <BlogBody searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}

export default BlogPage;
