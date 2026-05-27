import ArticleBoxSkeleton from "./article-box-skeleton"

function ArticleBodySkeleton() {
  return (
    <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4'>
      <ArticleBoxSkeleton />
      <ArticleBoxSkeleton />
      <ArticleBoxSkeleton />
      <ArticleBoxSkeleton />
      <ArticleBoxSkeleton />
      <ArticleBoxSkeleton />
      <ArticleBoxSkeleton />
    </div>
  )
}

export default ArticleBodySkeleton