import Box from "@/components/ui/box";
import Skeleton from "@/components/ui/skeleton";

function PrimaryReferenceBoxSkeleton() {
  return (
    <Box>
      <div className="flex justify-between mb-6">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="size-8" />
      </div>
      <div>
        <Skeleton className="h-3 mb-2.5" />
        <Skeleton className="h-3 mb-2.5" />
        <Skeleton className="h-3 mb-2.5" />
        <Skeleton className="w-1/3 h-3 mb-2.5" />
      </div>
    </Box>
  );
}

export default PrimaryReferenceBoxSkeleton;
