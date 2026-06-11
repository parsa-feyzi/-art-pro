import Box from "@/src/components/ui/box";
import dateToTimeHandler from "@/src/lib/funcs/dateToTime";
import { Article } from "@/src/lib/types";
import Link from "next/link";
import ArticlePublishStatusDot from "@/src/components/web/article-publish-status-dot";
import MultiAuthorsPattern from "./multi-authors-pattern";
import OneAuthorPattern from "./one-author-pattern";
import { cn } from "@/src/lib/utils";
import { ClassNameValue } from "tailwind-merge";

type Props = Article & { className?: ClassNameValue }

function ArticleBox({ title, content, authors, status, _createdAt, _id, className }: Props) {
  return (
    <Box className={cn("transition-all duration-200 flex flex-col justify-between hover:border-primary h-full", className)}>
      <div>
        <div className="flex justify-between gap-4">
          <Link href={`/blog/${_id}`} className="font-bold sm:text-lg text-base min-h-10">
            {title}
          </Link>
          <ArticlePublishStatusDot status={status} className="mt-3" />
        </div>
        <div className="sm:text-sm text-xs text-muted-foreground line-clamp-3 pt-2 sm:leading-5.5 leading-5">
          {content}
        </div>
      </div>
      <div className="flex justify-between items-end pt-5 text-sm">
        <div className="">
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
        <div className="text-xs text-tertiary">
          {dateToTimeHandler(_createdAt.toString())}
        </div>
      </div>
    </Box>
  );
}

export default ArticleBox;
