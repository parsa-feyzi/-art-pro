import Skeleton from '@/components/ui/skeleton'
function ArticlePageSkeleton() {
  return (
    <main className="pt-8">
      <div className="pb-6 mb-10 border-b-2 border-gray-500/40">
        <Skeleton className="h-9 w-32 mb-16" />
        <Skeleton className="h-10 w-1/2 mb-10" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
      <div>
        <Skeleton className="h-4 mb-2" />
        <Skeleton className="h-4 mb-2" />
        <Skeleton className="h-4 mb-2" />
        <Skeleton className="h-4 mb-2" />
        <Skeleton className="h-4 mb-2" />
        <Skeleton className="h-4 mb-2" />
        <Skeleton className="h-4 mb-2" />
        <Skeleton className="h-4 mb-2" />
        <Skeleton className="h-4 mb-2" />
        <Skeleton className="h-4 mb-2" />
        <Skeleton className="h-4 mb-2" />
        <Skeleton className="h-4 mb-2" />
        <Skeleton className="h-4 w-1/3 " />
      </div>
    </main>
  )
}

export default ArticlePageSkeleton