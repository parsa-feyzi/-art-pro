import Skeleton from "@/src/components/ui/skeleton";

function BlogHeaderSkeleton() {
  return (
    <div className="mb-4 sticky sm:top-0 top-14 left-0 z-20 bg-background sm:py-4 py-2 sm:px-2">
      <div className="sm:p-0 p-1.5 sm:border-none border border-input rounded-lg md:grid md:grid-cols-12 flex items-center gap-4 justify-between">
        <Skeleton className="md:h-12 h-10 lg:col-span-8 md:col-span-7" />
        <Skeleton className="md:h-12 h-10 lg:col-span-4 md:col-span-5 md:w-auto w-1/12" />
      </div>
    </div>
  );
}

export default BlogHeaderSkeleton;
