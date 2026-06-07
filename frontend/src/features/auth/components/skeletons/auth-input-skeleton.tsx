import Skeleton from "@/src/components/ui/skeleton";

function AuthInputSkeleton() {
  return (
    <div className="mb-6.25">
      <Skeleton className="h-4 mb-2 w-24" />
      <Skeleton className="h-8" />
    </div>
  );
}

export default AuthInputSkeleton;
