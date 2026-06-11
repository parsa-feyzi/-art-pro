import Box from "@/src/components/ui/box";
import Skeleton from "@/src/components/ui/skeleton";
import { cn } from "@/src/lib/utils";
import { ClassNameValue } from "tailwind-merge";

interface Props { className?: ClassNameValue }

function UserBoxSkeleton({ className }: Props) {
  return (
    <Box className={cn(className)}>
      <div className="flex items-center gap-2">
        <Skeleton className="size-10 rounded-full" />
        <div>
          <Skeleton className="w-24 h-3" />
          <Skeleton className="w-12 h-2 mt-2" />
        </div>
      </div>
      <div className="pt-6">
        <div className="grid grid-cols-12 gap-2 mb-3">
          <Skeleton className="col-span-1 size-2" />
          <Skeleton className="col-span-11 h-2" />
        </div>
        <div className="grid grid-cols-12 gap-2 mb-3">
          <Skeleton className="col-span-1 size-2" />
          <Skeleton className="col-span-11 h-2" />
        </div>
        <div className="grid grid-cols-12 gap-2">
          <Skeleton className="col-span-1 size-2" />
          <Skeleton className="col-span-11 h-2" />
        </div>
      </div>
        <Skeleton className="h-4 w-20 mt-6" />
    </Box>
  );
}

export default UserBoxSkeleton;
