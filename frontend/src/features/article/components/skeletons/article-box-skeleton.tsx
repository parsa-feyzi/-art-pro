import Box from "@/src/components/ui/box";
import Skeleton from "@/src/components/ui/skeleton";

function ArticleBoxSkeleton() {
  return (
    <Box className="flex flex-col justify-between">
      <div>
        <Skeleton className="w-4/5 h-10 mb-5" />
        <div>
          <Skeleton className="h-3 mb-2.5" />
          <Skeleton className="h-3 mb-2.5" />
          <Skeleton className="w-1/3 h-3 mb-2.5" />
        </div>
      </div>
      <div className="flex justify-between items-end pt-6">
        <div className="flex gap-2 items-center">
          <Skeleton className="size-8 rounded-full" />
          <div>
            <Skeleton className="h-2.5 w-16 mb-2" />
            <Skeleton className="h-1.5 w-20" />
          </div>
        </div>
        <Skeleton className="h-3 w-20" />
      </div>
    </Box>
  );
}

export default ArticleBoxSkeleton;
