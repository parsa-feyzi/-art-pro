import ArticlePublishStatusDot from "@/src/components/web/article-publish-status-dot"
import { Article } from "@/src/lib/types"
import Link from "next/link"

function UserBoxArticleItem({ title, status, _id }: Omit<Article, "authors">) {
  return (
    <Link href={`/blog/${_id}`} className="flex items-center gap-2 mb-2">
        <ArticlePublishStatusDot status={status} />
        <div className="hover:text-primary hover:underline text-xs line-clamp-1">{title}</div>
    </Link>
  )
}

export default UserBoxArticleItem