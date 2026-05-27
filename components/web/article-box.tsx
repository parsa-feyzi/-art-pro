import Box from "@/components/ui/box";
import dateToTimeHandler from "@/lib/funcs/dateToTime";
import { Article } from "@/lib/types";
import Link from "next/link";
import ArticlePublishStatusDot from "@/components/web/article-publish-status-dot";
import MultiAuthorsPattern from "./multi-authors-pattern";
import OneAuthorPattern from "./one-author-pattern";

function ArticleBox({ title, content, authors, status, _createdAt, _id  }: Article) {
  return (
    <Box className="flex flex-col justify-between hover:border-primary">
      <div>
        <div className="flex justify-between gap-4">
          <Link href={`/blog/${_id}`} className="font-bold text-lg min-h-10">
            {title}
          </Link>
          <ArticlePublishStatusDot status={status} className="mt-3" />
        </div>
        <div className="text-sm opacity-70 line-clamp-3 pt-2 leading-5.5">
          {content}
        </div>
      </div>
      <div className="flex justify-between items-end pt-5 opacity-95 text-sm">
        <div className="opacity-90">
          {authors.length > 1 ? (
            <MultiAuthorsPattern authors={authors} />
          ) : (
            <OneAuthorPattern
              userName={authors[0].userName}
              email={authors[0].email}
              profileImage={authors[0].profileImage}
            />
          )}
        </div>
        <div className="text-xs opacity-90">
          {dateToTimeHandler(_createdAt.toString())}
        </div>
      </div>
    </Box>
  );
}

export default ArticleBox;
