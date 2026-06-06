import { Button, buttonVariants } from "@/src/components/ui/button";
import TowContentSeparator from "@/src/components/ui/tow-content-separator";
import dateToTimeHandler from "@/src/lib/funcs/dateToTime";
import { Article } from "@/src/lib/types";
import { ArrowLeft, Eye } from "lucide-react";
import Link from "next/link";
import MultiAuthorsPattern from "./multi-authors-pattern";
import OneAuthorPattern from "./one-author-pattern";
import { cn } from "@/src/lib/utils";

function ArticlePageHead({ title, _updatedAt, authors, status, views }: Article) {
  return (
    <div className="pb-6 mb-10 border-b-2 border-input">
      <div className="flex justify-between items-center md:mb-16 mb-12">
        <div>
            <Link
              href="/blog"
              className={cn(
                buttonVariants({
                  variant: "secondary",
                }),
                "md:inline-flex! hidden! items-center gap-1"
              )}
            >
              <ArrowLeft />
              Back to Blog
            </Link>
            <Link
              href="/blog"
              className={cn(
                buttonVariants({
                  variant: "secondary",
                  size: "sm"
                }),
                "md:hidden! inline-flex! items-center gap-1 text-sm"
              )}
            >
              <ArrowLeft className="size-4" />
              Blog
            </Link>
        </div>
        <div className="flex items-center gap-0.5 opacity-70 text-sm">
          <Eye className="size-5" />
          {views}
        </div>
      </div>
      <div className="font-bold md:text-4xl text-3xl mb-10">{title}</div>
      <div className="flex justify-between items-center">
        <TowContentSeparator
          firstData={
            <div>
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
          }
          lastData={
            <div className="flex pt-1">
              {dateToTimeHandler(_updatedAt.toString())}
            </div>
          }
          className="sm:flex hidden"
        />
        <div className="sm:hidden block">
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
        <Button
          size={"sm"}
          variant={"secondary"}
          className={`${
            status === "published" ? "text-primary" : "text-danger"
          } cursor-default md:text-base! text-xs!`}
        >
          {status === "published" ? "Published" : "Draft"}
        </Button>
      </div>
    </div>
  );
}

export default ArticlePageHead;
